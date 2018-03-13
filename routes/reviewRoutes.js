'use strict';
const express = require('express');
const router = express.Router();

router.post('/api/reviews', (req, res) => {
  if (!req.user) {
    return res.status(401).send({error: 'You must sign in first.'});
  }
  
});
