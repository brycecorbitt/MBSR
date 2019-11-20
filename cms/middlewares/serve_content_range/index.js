const koa_range = require('koa-range');

module.exports = strapi => {
  return {
    initialize: function(cb) {
      strapi.app.use(koa_range);
      strapi.log.info("Loaded custom HTML5 stream middleware successfully.");
      cb();
    }
  };
};