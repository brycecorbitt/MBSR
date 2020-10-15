const express = require('express');
const fs = require('fs');

const router = express.Router();
const route_path = function(path, endpoint) {
  const router_module = require(path);
  router.use(endpoint, router_module);
}
const route_paths = function(proc_path, mod_path, endpoint) {
  endpoint = endpoint || '';
  fs.readdirSync(proc_path).forEach((file) => {
    route_path(`${mod_path}/${file}`, endpoint);
    console.log(`Mapped route: ${file}`);
  })
}

route_paths('./routes/html', './html')
route_paths('./routes/api/user', './api/user', '/api');
route_paths('./routes/api/cms', './api/cms', '/api/content')
route_paths('./routes/api/event', './api/event', '/api/event')


module.exports = router;