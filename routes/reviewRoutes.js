'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/Review');

router.get('/api/reviews', (req, res) => {
  Review.find().populate('_user').then(results => {
    res.json(results);
  });
});

router.get('/api/reviews/:matchId', (req, res, next) => {
  const { matchId } = req.params;

  if (!req.user) {
    return res.status(401).send({ error: 'You must sign in first.' });
  }

  Review.find({ match: matchId })
    .select('rating moment match _user')
    .populate('_user')
    .then(results => {
      res.json(results);
    });
});

router.put('/api/reviews/:matchId', (req, res, next) => {
 
  const { matchId } = req.params;
  const { rating, moment } = req.body;

  const updateObj = { rating, moment };
  const options = { new: true };

  Review.findOneAndUpdate({ match: matchId }, updateObj, options)
    .select('rating moment match')
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/api/reviews', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must sign in first.' });
  }

  const { name, id } = req.user;

  const { match, rating, moment } = req.body;
  const reviewItem = { match, rating, moment, _user: req.user.id};

  if (!match) {
    const err = new Error('Missing `rating` in request body');
    err.status = 400;
    return next(err);
  }

  Review.find({ match: match, _user: req.user.id })
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return Promise.reject({ code: 400, message: 'Could not create' });
      }

      return Review.create(reviewItem).then(result => {
        res
          .location(`${req.originalUrl}/${result.id}`)
          .status(201)
          .json(result);
      });
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
  // if (!req.user) {
  //   return res.status(401).send({ error: 'You must sign in first.' });
  // }
  const { id } = req.params;
  Review.findOneAndRemove({_id: id, _user: req.user.id})
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
