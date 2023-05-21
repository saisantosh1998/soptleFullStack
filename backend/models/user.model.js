const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!value.match(/^\S+@\S+\.\S+$/)) {
          throw new Error(
            "Not a valid email"
          );
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    role:{
      type: String,
      enum: ['admin', 'user'],
      required: true,
      trim: true,
      default:"user"
    }
  },
  {
    timestamps: true,
  }
);


userSchema.statics.isEmailTaken = async function (email) {
  return this.findOne({ email: email });
};


userSchema.methods.isPasswordMatch = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};


userSchema.pre("save", function (next) {
  const user = this;
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


const User = mongoose.model('User', userSchema);
module.exports = { User }
