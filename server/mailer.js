const nodemailer = require("nodemailer");
const config = require("../config.json")["mailer"];

//NOTE: THIS Mail Service is currently using a gmail account as a proof-of-concept
// in production, this should point to a Umass Medical SMTP server instead.

class Mailer {
	constructor() {
    try {
      this.user = config.auth.user
      this.transporter = nodemailer.createTransport(config);
      console.log("Started Mailer Service");
      this.initialized = true;
    }
    catch(e) {
      console.error("Failed to initialize Mailer Service. Configuration is likely missing or invalid.");
    }
	}

	send(to_addr, subject, html) {
    if(!this.initialized) {
      console.error("Tried to send email, but Mail Service is not configured properly!");
      return;
    }

    let mailopts = {
      from: this.user,
      to: to_addr,
      subject: subject,
      html: html

    }

		this.transporter.sendMail(mailopts, function(error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
  }
  
  self_notify(subject, html) {
    this.send(this.user, subject, html);
  }
}

const mail_service = new Mailer();
// var mailOptions = {
//   from: config.user,
//   to: 'bscorbitt@wpi.edu',
//   subject: 'MBSR Support: Test email',
//   text: 'This is a test email to ensure that this is working!'
// };
// mail_service.send(mailOptions)

module.exports = mail_service;
