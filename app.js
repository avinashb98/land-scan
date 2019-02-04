require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const Session = require('express-session');

// mongodb config
require('./config/db');

// Routes
const UserRoutes = require('./src/routes/user');
const RegionRoutes = require('./src/routes/region');
const VectorRoutes = require('./src/routes/vector');

// Passport configurations
require('./config/passport');

// Initializing express app
const app = express();

// Adds helmet middleware
app.use(helmet());

// Etag disable
app.set('etag', false);

// Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '1mb',
  extended: true
}));

app.use(Session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));


const limiter = new RateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);

// Router Initialization
app.get('/api/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to Land-Scan API'
  });
});

app.use('/api/user/', UserRoutes);
app.use('/api/region/', RegionRoutes);
app.use('/api/vector/', VectorRoutes);

module.exports = app;
