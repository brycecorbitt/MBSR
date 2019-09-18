const csvLoader = require("csv-load-sync");
const express = require("express");
const shortHash = require("shorthash");
const User = require("../../db/models/user");

var router = express.Router();

// The users to be registered should ideally be retrieved in a less hard-coded way, but
// will be read from a CSV for this project to save time.
const users_file = "users_to_register.csv";
const users = (path => {
	//load first_name, last_name, and email from csv file
	let entries = csvLoader(path);
	let result = {};
	//generate a unique hash based off the email to be used in the url.
	entries.forEach(entry => {
		entry.email = entry.email.toLowerCase();
		result[shortHash.unique(entry.email)] = entry;
	});
	return result;
})(users_file);

router.get("/register/success", function(req, res) {
	res.render("register_success");
});

router
	.route("/register/:id")
	.get(function(req, res) {
		let id = req.params.id;

		// If url to register is valid
		if (id in users) {
			res.render("register_form", { user: users[id] });
		} else res.status(404).send();
	})
	.post(async function(req, res) {
		let id = req.params.id;
		if (!(id in users)) res.status(403).send();

		// get fields from body
		let params = req.body;
		if(!(params.username && params.password && params.password_confirm)) {
			res.render("register_form", {
				user: users[id],
				error: "Missing Required Fields"
			});
			return;
		}

		//all usernames will be stored in lowercase
		params.username = params.username.toLowerCase();

		//check if passwords match
		if (params.password !== params.password_confirm) {
			res.render("register_form", {
				user: users[id],
				error: "Entered passwords do not match."
			});
			return;
		}

		//check if user un same email already exists
    let registered_users = await User.find({ email: users[id].email });
		if (registered_users.length) {
			res.render("register_form", {
				user: users[id],
				error: "An account with this email already exists."
			});
			return;
		}
		//check if user under same username already exists
		registered_users = await User.find({ username: params.username });
		if (registered_users.length) {
			res.render("register_form", {
				user: users[id],
				error: "An account with this username already exists."
      });
      return;
    }

		delete params.password_confirm;
		Object.assign(params, {
			first_name: users[id].first_name,
			last_name: users[id].last_name,
			email: users[id].email
		});

		//create user and save to database
		let user = new User(params);
		user
			.save()
			.then(result => {
				res.redirect("/register/success");
			})
			.catch(err => {
				res.render("register_form", {
					user: user[id],
					error: `Error Creating User: ${err}`
				});
			});
	});

console.log("Users that can be registered:");
for (const [key, value] of Object.entries(users)) {
	console.log(
		`\t${value.first_name} ${value.last_name}, ${value.email} => /register/${key}`
	);
}

module.exports = router;
