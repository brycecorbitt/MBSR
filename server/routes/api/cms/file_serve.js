const express = require("express");
const strapi = require("../../../strapi_init");

const router = express.Router();

router.get("/file/*", async function(req,res,next) {
  var path = req.originalUrl.substring(req.originalUrl.indexOf("/file/") + 6)
  if (!path) {
    console.error("No id found")
    res.status(404).send();
    return;
  }

  // Request for CMS file as a stream and pipe its output to response
  strapi.axios.request({method: 'get', url: `/uploads/${path}`, responseType: 'stream'}).then(response => {
    response.data.pipe(res);
  }).catch(err => {
    console.error(err);
    res.status(500).send();
  });
});

module.exports = router;