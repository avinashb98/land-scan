const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../src/models/user');

passport.use(new LocalStrategy({
  usernameField: 'userId',
  passwordField: 'password',
}, (userId, password, done) => {
  User.findOne({ userId })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));
