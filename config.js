'use strict';

module.exports = {
  PORT: process.env.PORT || 3001,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  JWT_SECRET: 'letusplaysomefutball',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
