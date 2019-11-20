const express = require("express");
const strapi = require("../../../strapi_init");

const router = express.Router();

router.get("/audio_ex", async function(req, res, next) {
	let { limit, start } = req.query;
  let current_date = new Date();
  current_date.setHours(0, 0, 0, 0);


	if (limit && start != undefined)
		var entries = await strapi.axios.get(`/audioexercises?_limit=${limit}&_start=${start}&_sort=date:asc`);
	else
		var entries = await strapi.request("/audioexercises?_sort=date:asc", {
			params: { _sort: "date:asc" }
		});
  
	res.send(entries.data);
});

module.exports = router;
