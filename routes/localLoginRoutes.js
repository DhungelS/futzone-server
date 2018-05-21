('use strict');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

require('../passport/local');

const options = { session: false, failWithError: true };
const utils = require('./utils');
const localAuth = passport.authenticate('local', options);



router.get('/', (req, res, next) => {
  User.find().then(users => {
    res.json(users);
  });
});


router.post('/', localAuth, (req, res, next) => {
  console.log(req.user)
  const authToken = utils.createAuthToken(req.user);
  res.status(200).json({ authToken });
});


const jwtAuth = passport.authenticate('jwt', options);
router.post('/refresh', jwtAuth, (req, res, next) => {
  const authToken = utils.createAuthToken(req.user);
  res.status(200).json({ authToken });
});

module.exports = router;
