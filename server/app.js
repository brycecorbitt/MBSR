const express = require("express");
const bodyParser = require("body-parser");
const mongoose_connection = require("./db/database");
const cms = require("./strapi_init");

// Authenticate CMS once MongoDB has connected
mongoose_connection(function() {
	// Launch Express server once CMS has been connected
	cms.init(launch_server);
});

// Function to start Express server
const launch_server = function() {
	const app = express();
	const port = process.env.SERVER_PORT || 34543;

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.get("/", (req, res) => res.send("Successfully reached MBSR server!"));

	const server = app.listen(port, () => console.log(`MBSR server listening on port ${port}!`));
};

process.on('SIGINT', shutdown);


function shutdown() {
    server.close(() => {
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close MBSR server connections in time, forcefully shutting down');
        process.exit(3);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}
