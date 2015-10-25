var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

var Account = new Schema({
    //username: String,
    //password: String
    username: { type: String, required: true, unique: true },
  	email: { type: String, required: true, unique: true },
  	countrie: String,
  	password: { type: String, required: true },
  	resetPasswordToken: String,
  	resetPasswordExpires: Date
});

Account.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

Account.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);