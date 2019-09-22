let mongoose = require('mongoose');
let validator = require('validator');
const Mailer = require("../../mailer");

let accountRequestSchema = mongoose.Schema({
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
  },
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: value => {
			return validator.isEmail(value);
		}
  }
}, 
{
  timestamps: true
});

accountRequestSchema.methods.send_email = function() {
  const subject = "Do You Mindful Notify - Account Request";
  const email_html = 
  `
    <p>New Account Request Recieved</p>
    <p>Email: <b>${this.email}</b></p>
    <p>First Name: <b>${this.first_name || "not specified"}</b></p>
    <p>Last Name: <b>${this.last_name || "not specified"}</b></p>
    <p>-Do You Mindful Support</p>
  `;
  Mailer.self_notify(subject, email_html);
};
module.exports = mongoose.model('AccountRequest', accountRequestSchema);
