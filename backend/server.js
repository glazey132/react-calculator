const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = app.listen(process.env.SERVER_PORT || 8080);
const io = require('socket.io')(server);
io.set('origins', '*:*');
io.set('match origin protocol', true);

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

// Example route
app.get('/', function(req, res) {
  res.send('Hello world');
});

io.on('connection', function(socket) {
  console.log('connected to sockets!');

  socket.on('mount', function() {
    Calculation.find()
      .sort({ timestamp: 'desc' })
      .limit(10)
      .exec(function(err, res) {
        socket.emit('calculationsUpdate', res);
      });
  });
  socket.on('computation', function(computation) {
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
