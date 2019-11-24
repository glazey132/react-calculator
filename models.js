const mongoose = require('mongoose');

const calculationSchema = mongoose.Schema({
  computation: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  }
});

let Calculation = mongoose.model('Calculation', calculationSchema);

module.exports = {
  Calculation
};
