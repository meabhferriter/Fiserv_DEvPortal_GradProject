const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
(SALT_WORK_FACTOR = 10),
  // these values can be whatever you want - we're defaulting to a
  // max of 3 attempts, resulting in a 2 second lock
  (MAX_LOGIN_ATTEMPTS = 3),
  (LOCK_TIME = 0.02 * 60 * 60 * 1000);

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  username: { type: String, index: { unique: true } },
  firstName: { type: String },
  lastName: { type: String },
  merchant: { type: String },
  company: { type: String },
  jobTitle: { type: String },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Number },
});
var reasons = (userSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2,
});

userSchema.virtual("isLocked").get(function () {
  // check for a future lockUntil timestamp
  return !!(this.lockUntil && this.lockUntil > LOCK_TIME);
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (saltError, salt) {
    if (err) return next(saltError);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};
userSchema.methods.incLoginAttempts = function (cb) {
  // if we have a previous lock that has expired, restart at 1
  console.log("Date.now()", Date.now(), this.lockUntil);

  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update(
      { $set: { loginAttempts: 1 }, $unset: { lockUntil: 1 } },
      cb
    );
  } // otherwise we're incrementing
  var updates = { $inc: { loginAttempts: 1 } }; // lock the account if we've reached max attempts and it's not locked
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    return this.update(updates, cb);
  }
  return this.update(updates, cb);
};
userSchema.statics.getAuthenticated = function (username, password, cb) {
  this.findOne({ username: username }, function (err, user) {
    if (err) {
      return cb(err);
    }
    // make sure the user exists
    if (!user) {
      return cb(user, null, reasons.NOT_FOUND);
    }
    // check if the account is currently locked
    if (user.isLocked) {
      // just increment login attempts if account is already locked
      return user.incLoginAttempts(function (err) {
        if (err) return cb(err);
        return cb(null, null, reasons.MAX_ATTEMPTS);
      });
    }
    // test for a matching password
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      if (isMatch) {
        // if there's no lock or failed attempts, just return the user
        if (!user.loginAttempts && !user.lockUntil) {
          return cb(null, user);
        }
        // reset attempts and lock info

        var updates = {
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 },
        };
        return user.update(updates, function (err) {
          if (err) return cb(err);
          return cb(null, user);
        });
      } else {
        user.incLoginAttempts(function (err) {
          if (err) return cb(err);
          return cb(null, null, reasons.PASSWORD_INCORRECT);
        });
      }
    });
  });
};

module.exports = mongoose.model("User", userSchema);
