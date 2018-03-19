'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login'
  }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/api/current_user', (req, res) => {
  res.json(req.user);
});

module.exports = router;
