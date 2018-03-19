'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/Review');


router.get('/api/reviews', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must sign in first.' });
  }

  Review.find({ _user: req.user.id })
    .select('rating moment')
    .then(results => {
      console.log(results);
      res.json(results);
    });
});

router.post('/api/reviews', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must sign in first.' });
  }

  const { rating, moment } = req.body;
  const reviewItem = { rating, moment, _user: req.user.id };

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

router.delete('/api/reviews/:id', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must sign in first.' });
  }
  const { id } = req.params;
  Review.findByIdAndRemove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch(next);
});


module.exports = router;
