let mongoose = require('mongoose');
let validator = require('validator');
let shortid = require('shortid')
let bcrypt = require(bcrypt),

const SALT_WORK_FACTOR = 10;

let userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: value => {
			return validator.isEmail(value);
		}
  },
  password: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
});

userSchema.pre(save, function(next) {
    var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('Email', emailSchema);
