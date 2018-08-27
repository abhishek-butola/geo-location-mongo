const passport = require('passport');
const express = require('express');
const router = express.Router();

const Location = require('../../models/Location');

//@route POST api/location/
//@desc add user to db
//@access UNDEFINED
router.post('/create', (req, res) => {
  const location = {
    uid: req.body.uid
  };
  const newUid = new Location(location);
  newUid
    .save()
    .then(result => {
      if (result) {
        res.json({ success: true, message: 'User Created' });
      } else {
        console.log('Failed to add');
      }
    })
    .catch(err => console.log(err));
});

//@route POST api/location/near
//@desc get nearest location userid
//@access UNDEFINED
router.post('/near', (req, res) => {
  const longitude = req.body.long;
  const latitude = req.body.lat;

  Location.aggregate()
    .near({
      near: {
        type: 'Point',
        coordinates: [parseFloat(latitude), parseFloat(longitude)]
      },
      maxDistance: 100000,
      spherical: true,
      distanceField: 'dis'
    })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

//@route PATCH api/location
//@desc Update Location
//@access UNDEFINED
router.put('/add', (req, res) => {
  const location = {
    lat: req.body.lat,
    lon: req.body.long
  };
  Location.findOne({ uid: req.body.uid })
    .then(result => {
      if (result) {
        result.set({
          geometry: {
            coordinates: [parseFloat(location.lat), parseFloat(location.lon)]
          }
        });
        console.log(result);
        result
          .save()
          .then(res.json({ message: 'Success' }))
          .catch(err => console.log(err));
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
