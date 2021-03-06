const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const server = app.listen(process.env.PORT || 3000);

const io = SocketIO.listen(server);

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const Calculation = require('./models').Calculation;

mongoose.Promise = require('bluebird');
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mongoose'))
  .catch(err => console.error(err));

mongoose.Promise = global.Promise;

//Session
app.use(
  session({
    secret: process.env.SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//     'Access-Control-Allow-Origin',
//     'wss://react-calc-12345.herokuapp.com/'
//   );
//   res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

io.on('connection', function(socket) {
  console.log('connected to sockets!');

  socket.on('mount', function() {
    console.log('user mounted');

    Calculation.find()
      .sort({ timestamp: 'desc' })
      .limit(10)
      .exec(function(err, res) {
        if (err) {
          console.error(err);
        } else {
          console.log("TCL: res", res)
          socket.emit('calculationsUpdate', res);
        }
      });
  });

  socket.on('computation', function(computation) {
    console.log('socket received computation ', computation);
    let newDate = new Date().toLocaleString();

    let newCalculation = new Calculation({
      computation: computation,
      timestamp: newDate
    });

    newCalculation.save(function(error, newCalc) {
      if (error) {
        console.log('error: ', error);
      } else {
        Calculation.find()
          .sort({ timestamp: 'desc' })
          .limit(10)
          .exec(function(err, res) {
            io.emit('calculationsUpdate', res);
          });
      }
    });
    
  });
});
