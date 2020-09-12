const express = require("express");
const strapi = require("../../../strapi_init");
var proxy = require('express-http-proxy');


const router = express.Router();

router.all("/file/*", proxy(`${strapi.defaults.baseURL}`,{
  proxyReqPathResolver: function (req) {
    console.log(req.url)
    return req.url.replace('file', 'uploads');
  }}))


module.exports = router;