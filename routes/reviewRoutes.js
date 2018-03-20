'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/Review');



router.get('/api/reviews/:id', (req, res, next) => {

  const {id} = req.params;
  // if (!req.user) {
  //   return res.status(401).send({ error: 'You must sign in first.' });
  // }

  Review.find({match:id})
    .select('rating moment match')
    .then(results => {
      res.json(results);
    });
});

router.post('/api/reviews', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must sign in first.' });
  }

  const { match, rating, moment } = req.body;
  const reviewItem = { match, rating, moment, _user: req.user.id };

  if (!match) {
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
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('A review for this match already exists');
        err.status = 400;
      }
      next(err);
    });
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
