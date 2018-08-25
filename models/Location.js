const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geolocation schema
const GeoSchema = new Schema({
  type: {
    default: 'Point',
    type: String
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

const LocationSchema = new Schema({
  uid: {
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  },
  geometry: GeoSchema
});

module.exports = Location = mongoose.model('locations', LocationSchema);
