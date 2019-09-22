const express = require("express");
const Mailer = require("../../../mailer");
const User = require("../../../db/models/user");
const UserRecovery = require("../../../db/models/user_recovery");


var router = express.Router();

router.post("/login", async function(req, res) {
	let { username, password } = req.body;
	// ensure that both fields are filled out
	if (!(username && password)) {
		res.status(400).json({ data: {}, error: "Missing Required Fields." });
		return;
	}
	username = username.toLowerCase();

	// search for user with matching email/username
	let email_match = await User.findOne({ email: username });
	let username_match = await User.findOne({ username: username });

	if (!(email_match || username_match)) {
		res.status(400).json({ data: {}, error: "Incorrect Email or Username." });
		return;
	}

	let user = email_match ? email_match : username_match;
	// check to see if password matches
	if (!user.comparePassword(password))
		res.status(401).json({ data: {}, error: "Incorrect Password." });
	// if everthing lines up, return information about the user.
	else {
		// associate the authenticated user with the session used in the request.
		req.session.user = user;

		let data = {};
		Object.assign(data, user._doc);
		delete data.password;
		delete data.__v;
		delete data._id;
		res.json({ data: data });
	}
});

router.get("/account", function(req, res) {
	if (!req.session.user) {
		res.json({ data: null });
		return;
	}

	let data = {};
	Object.assign(data, req.session.user);
	delete data.password;
	delete data.__v;
	delete data._id;
	res.json({ data: data });
});

router.get("/logout", function(req, res) {
	req.session.destroy();
	res.status(200).json({});
});

router.post("/recover", async function(req, res) {
	let email = req.body.email;
	if(!email) {
		res.status(400).json({ data: {}, error: "Missing Required Fields." });
		return;
	}
	
	let match = await User.findOne({ email: email });
	if(!match) {
		res.status(400).json({ data: {}, error: "Account under the provided email does not exist." });
		return;
	}

	// Remove previous recovery entries under same user
	await UserRecovery.deleteMany({'user_account': match._id});

	// at this point, we have the user and can create an a recovery entry.
	var recovery = new UserRecovery({
		user_account: match._id
	})

	await recovery.save().catch(err => {
		res.status(500).json({error: err});
		return;
	});

	recovery.send_recovery_email();
	res.status(200).json({data: ["Recovery sent successfully!"]});
	
})

module.exports = router;
