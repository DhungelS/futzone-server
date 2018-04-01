'use strict';
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/keys');
const router = express.Router();

const localAuth = passport.authenticate('local', {session: false, failWithError: true});
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

function createAuthToken (user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY
  });
}

router.post('/api/login', localAuth, function (req, res) {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

router.post('/api/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;