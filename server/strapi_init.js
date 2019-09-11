const Strapi = require("strapi-sdk-javascript").default;

const USER = process.env.CMS_ADMIN_USERNAME || "mbsrcms";
const PASS = process.env.CMS_ADMIN_PASSWORD || "IQP2020";
const HOST = process.env.CMS_HOST || "localhost";
const PORT = 1337;

const strapi = new Strapi(`http://${HOST}:${PORT}`);
strapi.init = function(callback) {
	var max_attempts = 10;
	var current_attempt = 0;
	var connect_timeout = 2000;
	var error;
	var connect = () => {
		strapi
			.login(USER, PASS)
			.then(() => {
				console.log("Strapi CMS connection successful.");
				callback();
			})
			.catch(err => {
				current_attempt++;
				if (current_attempt >= max_attempts) {
					console.log(err);
					console.log("Failed to connect to Strapi CMS after " + max_attempts + " attempts.");
					process.exit(2);
				}
        setTimeout(connect, connect_timeout);
			});
	};
	setTimeout(connect, connect_timeout);
};

module.exports = strapi;
