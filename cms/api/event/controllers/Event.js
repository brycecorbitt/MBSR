'use strict';

/**
 * Event.js controller
 *
 * @description: A set of functions called "actions" for managing `Event`.
 */

module.exports = {

  /**
   * Retrieve event records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.event.search(ctx.query);
    } else {
      return strapi.services.event.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a event record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.event.fetch(ctx.params);
  },

  /**
   * Count event records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.event.count(ctx.query);
  },

  /**
   * Create a/an event record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.event.add(ctx.request.body);
  },

  /**
   * Update a/an event record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.event.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an event record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.event.remove(ctx.params);
  }
};
