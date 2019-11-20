const express = require("express");
const strapi = require("../../../strapi_init");

const router = express.Router();

router.get("/video_ex", async function(req, res, next) {
	let { limit, start } = req.query;
  let current_date = new Date();
  current_date.setHours(0, 0, 0, 0);


	if (limit && start != undefined)
		var entries = await strapi.axios.get(`/videoexercises?_limit=${limit}&_start=${start}&_sort=date:asc`);
	else
		var entries = await strapi.request("/videoexercises?_sort=date:asc", {
			params: { _sort: "date:asc" }
		});
  
	res.send(entries.data);
});

module.exports = router;
