'use strict';

/**
 * Audioexercise.js controller
 *
 * @description: A set of functions called "actions" for managing `Audioexercise`.
 */

module.exports = {

  /**
   * Retrieve audioexercise records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.audioexercise.search(ctx.query);
    } else {
      return strapi.services.audioexercise.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a audioexercise record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.audioexercise.fetch(ctx.params);
  },

  /**
   * Count audioexercise records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.audioexercise.count(ctx.query);
  },

  /**
   * Create a/an audioexercise record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.audioexercise.add(ctx.request.body);
  },

  /**
   * Update a/an audioexercise record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.audioexercise.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an audioexercise record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.audioexercise.remove(ctx.params);
  }
};
