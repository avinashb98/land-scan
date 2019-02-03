const passport = require('passport');
const User = require('../models/user');

const signUp = async (req, res) => {
  const { userId, password, name } = req.body;
  const userData = { userId };
  if (name) userData.name = name;

  let newUser;
  try {
    newUser = new User(userData);
    await Promise.all([
      newUser.setPassword(password),
      newUser.setUid()
    ]);
    await newUser.save();
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: 'New User Successfuly Created',
    data: {
      name: newUser.name,
      userId: newUser.userId
    }
  });
};

const login = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      res.status(403).json({
        message: 'Unable to authenticate user',
        data: {}
      });
      return;
    }

    if (!user) {
      res.status(404).json({
        message: 'Authentication failed',
        data: {}
      });
      return;
    }

    const userTemp = user;
    userTemp.token = user.generateJWT();

    res.status(200).json({
      message: 'Login Successful',
      data: { user: user.toAuthJSON() }
    });
  })(req, res);
};

module.exports = {
  signUp,
  login
};
