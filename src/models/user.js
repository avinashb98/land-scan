const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String
  },
  salt: {
    type: String
  },
  uid: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(
    password, this.salt, 10000, 512, 'sha512'
  ).toString('hex');
};

UserSchema.methods.setUid = function () {
  this.uid = uuidv1();
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(
    password, this.salt, 10000, 512, 'sha512'
  ).toString('hex');
  return this.passwordHash === hash;
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 1);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', UserSchema);
