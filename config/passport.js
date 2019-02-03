const passport = require('passport');
const LocalStrategy = require('passport-local');
const Admin = require('../src/models/user');

passport.use(new LocalStrategy({
  usernameField: 'userId',
  passwordField: 'password',
}, (userId, password, done) => {
  Admin.findOne({ userId })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));
