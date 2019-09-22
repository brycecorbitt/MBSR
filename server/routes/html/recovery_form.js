const express = require("express");
const UserRecovery = require("../../db/models/user_recovery");
const User = require("../../db/models/user");

var router = express.Router();

router.get("/recover/success", function(req, res) {
	res.render("success", {
		title: "You're all set!",
		message:
			"You've successfully reset your password. You may now try logging into the DoYouMindful App with with your new password."
	});
});

router
	.route("/recover/:id")
	.get(async function(req, res) {
		let id = req.params.id;
		let recovery = await UserRecovery.findById(id)
			.populate({ path: "user_account", model: "User" })
			.exec();

		//If a recovery entry is not found
		if (!recovery) {
			res
				.status(400)
				.send("This recovery request is either expired or invalid.");
			return;
		}

		res.render("recovery_form", { user: recovery.user_account });
	})
	.post(async function(req, res) {
		let id = req.params.id;
		let recovery = await UserRecovery.findById(id);

		//If a recovery entry is not found
		if (!recovery) {
			res
				.status(400)
				.send("This recovery request is either expired or invalid.");
			return;
		}

		let user = await User.findById(recovery.user_account);

		// get fields from body
		let params = req.body;
		// make sure both fields are printed out
		if (!(params.password && params.password_confirm)) {
			res.render("recovery_form", {
				user: { email: user.email },
				error: "Missing Required Fields"
			});
			return;
		}

		//check if passwords match
		if (params.password !== params.password_confirm) {
			res.render("recovery_form", {
				user: { email: user.email },
				error: "Entered passwords do not match."
			});
			return;
		}

		//save new password.
		user.password = params.password;
		user
			.save()
			.then(result => {
				recovery.remove();
				res.redirect("/recover/success");
			})
			.catch(err => {
				res.render("recovery_form", {
					user: { email: user.email },
					error: `Error setting new password: ${err}`
				});
			});
	});

module.exports = router;
