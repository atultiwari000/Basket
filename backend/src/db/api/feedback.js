const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FeedbackDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.create(
      {
        id: data.id || undefined,

        rating: data.rating || null,
        comments: data.comments || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await feedback.setCustomer(data.customer || null, {
      transaction,
    });

    await feedback.setProduct(data.product || null, {
      transaction,
    });

    return feedback;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const feedbackData = data.map((item, index) => ({
      id: item.id || undefined,

      rating: item.rating || null,
      comments: item.comments || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const feedback = await db.feedback.bulkCreate(feedbackData, {
      transaction,
    });

    // For each item created, replace relation files

    return feedback;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.findByPk(id, {}, { transaction });

    await feedback.update(
      {
        rating: data.rating || null,
        comments: data.comments || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await feedback.setCustomer(data.customer || null, {
      transaction,
    });

    await feedback.setProduct(data.product || null, {
      transaction,
    });

    return feedback;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of feedback) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of feedback) {
        await record.destroy({ transaction });
      }
    });

    return feedback;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.findByPk(id, options);

    await feedback.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await feedback.destroy({
      transaction,
    });

    return feedback;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.findOne({ where }, { transaction });

    if (!feedback) {
      return feedback;
    }

    const output = feedback.get({ plain: true });

    output.customer = await feedback.getCustomer({
      transaction,
    });

    output.product = await feedback.getProduct({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.customer_profiles,
        as: 'customer',
      },

      {
        model: db.products,
        as: 'product',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.comments) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('feedback', 'comments', filter.comments),
        };
      }

      if (filter.ratingRange) {
        const [start, end] = filter.ratingRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            rating: {
              ...where.rating,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.customer) {
        var listItems = filter.customer.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          customerId: { [Op.or]: listItems },
        };
      }

      if (filter.product) {
        var listItems = filter.product.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          productId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.feedback.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.feedback.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('feedback', 'rating', query),
        ],
      };
    }

    const records = await db.feedback.findAll({
      attributes: ['id', 'rating'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['rating', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.rating,
    }));
  }
};
