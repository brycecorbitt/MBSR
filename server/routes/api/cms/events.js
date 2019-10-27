const express = require("express");
const strapi = require("../../../strapi_init");

const router = express.Router();

router.get("/events", async function(req, res, next) {
	let { limit, start } = req.query;
  let current_date = new Date();
  current_date.setHours(0, 0, 0, 0);
 
  // NOTE: This line will ONLY work if the MBSR server is in the same timezone as
  //  the times entered for dates on events in the CMS server.
  current_date = new Date(current_date - new Date().getTimezoneOffset() * 1000 * 60);

	if (limit && start != undefined)
		var entries = await strapi.axios.get(`/events?_limit=${limit}&_start=${start}&_sort=date:asc`);
	else
		var entries = await strapi.request("/events?_sort=date:asc", {
			params: { _sort: "date:asc" }
		});
  
  // Filter out events from previous days.
  while (entries.data.length && Date.parse(entries.data[0].date) < current_date.getTime()) 
    entries.data.shift();
  
	res.send(entries.data);
});

module.exports = router;
