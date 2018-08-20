const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let port = process.env.PORT || 8080;
const server = app.listen(port, function() {
  console.log('App is running on port ' + port);
});
const io = require('socket.io')(server);

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
//BODYPARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
//     'https://react-calculator-69586.herokuapp.com/'
//   );
//   res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// Example route
app.get('/', function(req, res) {
  res.send('Hello world');
});

io.on('connection', function(socket) {
  console.log('connected to sockets!');

  socket.on('mount', function() {
    console.log('user mounted');
    Calculation.find()
      .sort({ timestamp: 'desc' })
      .limit(10)
      .exec(function(err, res) {
        socket.emit('calculationsUpdate', res);
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

// server.listen(process.env.SERVER_PORT || 8080, function() {
//   console.log('Backend server for Electron App running on port 8080!');
// });
