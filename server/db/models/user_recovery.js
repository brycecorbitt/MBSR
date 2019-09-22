let mongoose = require("mongoose");
const shortid = require("shortid");
const Mailer = require("../../mailer");
const config = require("../../../config");

let userRecoverySchema = mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	user_account: {
		type: mongoose.Schema.Types.ObjectID,
		ref: "User",
		required: true
	},
	expireAt: {
    type: Date,
    required: true,
    validate: [ function(v) {
        return (v - new Date()) >= 60000*60;
    }, 'Cannot expire less than 60 minutes in the future.' ],
    default: function() {
        // 24 hours from now
        return new Date(new Date().valueOf() + 60000*60*24);
    }
  }
});

userRecoverySchema.methods.send_recovery_email = function() {
  let url = `${config.mbsr_connection.protocol}://${config.mbsr_connection.host}:${config.mbsr_connection.port}/recover/${this._id}`;
  const subject = "Do You Mindful Support - Password Recovery";
  const email_html = 
  `
    <p>We've heard you've forgotten your password. Sorry about that!</p>
    <p>Don't worry, you can reset your password at the following link: <a href=${url}>${url}</a></p>
    <p>This link will be available for the next 24 hours.</p>
    <p>-Do You Mindful Support</p>
  `;
  this.populate('user_account', function(err, result) {
    let to_addr = result.user_account.email;
    Mailer.send(to_addr, subject, email_html);
  });
};


module.exports = mongoose.model("UserRecovery", userRecoverySchema);
