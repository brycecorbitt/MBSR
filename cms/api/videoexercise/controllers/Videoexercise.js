'use strict';

/**
 * Videoexercise.js controller
 *
 * @description: A set of functions called "actions" for managing `Videoexercise`.
 */

module.exports = {

  /**
   * Retrieve videoexercise records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.videoexercise.search(ctx.query);
    } else {
      return strapi.services.videoexercise.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a videoexercise record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.videoexercise.fetch(ctx.params);
  },

  /**
   * Count videoexercise records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.videoexercise.count(ctx.query);
  },

  /**
   * Create a/an videoexercise record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.videoexercise.add(ctx.request.body);
  },

  /**
   * Update a/an videoexercise record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.videoexercise.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an videoexercise record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.videoexercise.remove(ctx.params);
  }
};
