const express = require("express");
const User = require("../../../db/models/user");

var router = express.Router();

router.post("/login", async function(req, res) {
	let { username, password } = req.body;
	// ensure that both fields are filled out
	if (!(username && password)) {
		res.status(400).json({ data: {}, error: "Missing Required Fields." });
		return;
	}

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

module.exports = router;
