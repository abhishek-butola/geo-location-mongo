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

//@route PATCH api/location
//@desc Update Location
//@access UNDEFINED
router.patch('/', (req, res) => {
  const location = {
    latitude: req.body.lat,
    longitude: req.body.long
  };
  Location.findOne({ uid: req.body.uid })
    .then(result => {
      if (result) {
        result.set(location);
        result.save().then(res.json({ message: 'Success' }));
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
