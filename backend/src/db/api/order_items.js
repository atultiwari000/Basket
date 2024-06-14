const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Order_itemsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.create(
      {
        id: data.id || undefined,

        quantity: data.quantity || null,
        price: data.price || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await order_items.setOrder(data.order || null, {
      transaction,
    });

    await order_items.setProduct(data.product || null, {
      transaction,
    });

    return order_items;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const order_itemsData = data.map((item, index) => ({
      id: item.id || undefined,

      quantity: item.quantity || null,
      price: item.price || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const order_items = await db.order_items.bulkCreate(order_itemsData, {
      transaction,
    });

    // For each item created, replace relation files

    return order_items;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.findByPk(id, {}, { transaction });

    await order_items.update(
      {
        quantity: data.quantity || null,
        price: data.price || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await order_items.setOrder(data.order || null, {
      transaction,
    });

    await order_items.setProduct(data.product || null, {
      transaction,
    });

    return order_items;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of order_items) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of order_items) {
        await record.destroy({ transaction });
      }
    });

    return order_items;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.findByPk(id, options);

    await order_items.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await order_items.destroy({
      transaction,
    });

    return order_items;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const order_items = await db.order_items.findOne(
      { where },
      { transaction },
    );

    if (!order_items) {
      return order_items;
    }

    const output = order_items.get({ plain: true });

    output.order = await order_items.getOrder({
      transaction,
    });

    output.product = await order_items.getProduct({
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
        model: db.orders,
        as: 'order',
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

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
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

      if (filter.order) {
        var listItems = filter.order.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          orderId: { [Op.or]: listItems },
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
          count: await db.order_items.count({
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
      : await db.order_items.findAndCountAll({
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
          Utils.ilike('order_items', 'order', query),
        ],
      };
    }

    const records = await db.order_items.findAll({
      attributes: ['id', 'order'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['order', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.order,
    }));
  }
};
