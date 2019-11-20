const express = require("express");
const strapi = require("../../../strapi_init");
var proxy = require('express-http-proxy');


const router = express.Router();

router.get("/file/*", proxy(`${strapi.axios.defaults.baseURL}`,{
  proxyReqPathResolver: function (req) {
    return req.url.replace('file', 'uploads');
  }}))


module.exports = router;