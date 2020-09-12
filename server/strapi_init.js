const axios = require("axios");

const USER = process.env.CMS_ADMIN_USERNAME || "mbsrcms";
const PASS = process.env.CMS_ADMIN_PASSWORD || "mbsrMQP2021";
const HOST = process.env.CMS_HOST || "localhost";
const PORT = process.env.CMS_PORT || 1337;

const strapi = axios.create({baseURL: `http://${HOST}:${PORT}`});
strapi.init = function(callback) {
	var max_attempts = 10;
	var current_attempt = 0;
	var connect_timeout = 3000;
	var error;
	var connect = () => {
		strapi
			.post('/auth/local/', {identifier: USER, password: PASS})
			.then((response) => {
				if(error in response) {
					console.log("Failed to authenticate with Strapi CMS." + String(response.data))
				}
				else {
					let token = response.data.jwt
					strapi.defaults.headers.Authorization = "Bearer " + token

				}
				console.log("Strapi CMS connection successful.");
				callback();
			})
			.catch(err => {
				current_attempt++;
				if (current_attempt >= max_attempts) {
					console.log(err);
					console.log(`Failed to connect to Strapi CMS after ${max_attempts} attempts.`);
					process.exit(2);
				}
        setTimeout(connect, connect_timeout);
			});
	};
	setTimeout(connect, connect_timeout);
};

module.exports = strapi;
