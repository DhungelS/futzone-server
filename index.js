'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { PORT, CLIENT_ORIGIN } = require('./config');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const keys = require('./config/keys');
const morgan = require('morgan');
require('./models/User');
require('./passport/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(morgan('dev'));

app.use(
  cookieSession({
    maxAge: 15 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(reviewRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('deploy-client/build'));
  const path = require('path');
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'deploy-client', 'build', 'index'));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
