'use strict';

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const config = require('../config/keys');

const options = {
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  done(null, payload.user);
});

module.exports = jwtStrategy;