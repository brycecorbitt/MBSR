'use strict';

/* global Audioexercise */

/**
 * Audioexercise.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');

module.exports = {

  /**
   * Promise to fetch all audioexercises.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    const filters = convertRestQueryParams(params);
    const populateOpt = populate || Audioexercise.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)

    return buildQuery({
      model: Audioexercise,
      filters,
      populate: populateOpt,
    });
  },

  /**
   * Promise to fetch a/an audioexercise.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Audioexercise.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Audioexercise
      .findOne(_.pick(params, _.keys(Audioexercise.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count audioexercises.
   *
   * @return {Promise}
   */

  count: (params) => {
    const filters = convertRestQueryParams(params);

    return buildQuery({
      model: Audioexercise,
      filters: { where: filters.where },
    })
      .count()
  },

  /**
   * Promise to add a/an audioexercise.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Audioexercise.associations.map(ast => ast.alias));
    const data = _.omit(values, Audioexercise.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Audioexercise.create(data);

    // Create relational data and return the entry.
    return Audioexercise.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an audioexercise.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Audioexercise.associations.map(a => a.alias));
    const data = _.omit(values, Audioexercise.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Audioexercise.updateOne(params, data, { multi: true });

    // Update relational data and return the entry.
    return Audioexercise.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an audioexercise.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Audioexercise.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Audioexercise
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Audioexercise.associations.map(async association => {
        if (!association.via || !data._id || association.dominant) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an audioexercise.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('audioexercise', params);
    // Select field to populate.
    const populate = Audioexercise.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Audioexercise.attributes).reduce((acc, curr) => {
      switch (Audioexercise.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Audioexercise
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
