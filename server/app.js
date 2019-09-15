const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose_connection = require("./db/database");
const cms = require("./strapi_init");

// Authenticate CMS once MongoDB has connected
mongoose_connection(function() {
	// Launch Express server once CMS has been connected
	cms.init(launch_server);
});

// Function to start Express server
const launch_server = async function() {
	const app = express();
	const port = process.env.SERVER_PORT || 34543;

	app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        secret: "MY TEST SECRET"
    }));

	//configure pug as view engine for html pages
	app.set("view engine", "pug");
	app.set("views", "./views");

	//map html routes
	var register_form = require("./routes/html/register_form");
	app.use("/", register_form);

	app.get("/", (req, res) => res.render("home"));

	const server = app.listen(port, () =>
		console.log(`MBSR server listening on port ${port}!`)
	);

	process.on("SIGINT", shutdown);
	function shutdown() {
		server.close(() => {
			process.exit(0);
		});

		setTimeout(() => {
			console.error(
				"Could not close MBSR server connections in time, forcefully shutting down"
			);
			process.exit(3);
		}, 10000);
	}
};