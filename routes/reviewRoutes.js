'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/Review');

router.get('/api/reviews', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must sign in first.' });
  }

  Review.find()
    .select('rating moment')
    .then(results => {
      res.json(results);
    });
});

router.post('/api/reviews', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must sign in first.' });
  }

  const { rating, moment } = req.body;
  const reviewItem = { rating, moment };

  if (!rating) {
    const err = new Error('Missing `rating` in request body');
    err.status = 400;
    return next(err);
  }

  Review.create(reviewItem)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(next);
});

module.exports = router;
