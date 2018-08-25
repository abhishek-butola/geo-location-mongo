const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  uid: {
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
});

module.exports = Location = mongoose.model('locations', LocationSchema);
