const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class OrdersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.create(
      {
        id: data.id || undefined,

        order_date: data.order_date || null,
        delivery_date: data.delivery_date || null,
        status: data.status || null,
        total_amount: data.total_amount || null,
        payment_status: data.payment_status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await orders.setCustomer(data.customer || null, {
      transaction,
    });

    return orders;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const ordersData = data.map((item, index) => ({
      id: item.id || undefined,

      order_date: item.order_date || null,
      delivery_date: item.delivery_date || null,
      status: item.status || null,
      total_amount: item.total_amount || null,
      payment_status: item.payment_status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const orders = await db.orders.bulkCreate(ordersData, { transaction });

    // For each item created, replace relation files

    return orders;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findByPk(id, {}, { transaction });

    await orders.update(
      {
        order_date: data.order_date || null,
        delivery_date: data.delivery_date || null,
        status: data.status || null,
        total_amount: data.total_amount || null,
        payment_status: data.payment_status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await orders.setCustomer(data.customer || null, {
      transaction,
    });

    return orders;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of orders) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of orders) {
        await record.destroy({ transaction });
      }
    });

    return orders;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findByPk(id, options);

    await orders.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await orders.destroy({
      transaction,
    });

    return orders;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findOne({ where }, { transaction });

    if (!orders) {
      return orders;
    }

    const output = orders.get({ plain: true });

    output.deliveries_order = await orders.getDeliveries_order({
      transaction,
    });

    output.order_items_order = await orders.getOrder_items_order({
      transaction,
    });

    output.payments_order = await orders.getPayments_order({
      transaction,
    });

    output.customer = await orders.getCustomer({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              order_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              delivery_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.order_dateRange) {
        const [start, end] = filter.order_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            order_date: {
              ...where.order_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            order_date: {
              ...where.order_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.delivery_dateRange) {
        const [start, end] = filter.delivery_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            delivery_date: {
              ...where.delivery_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            delivery_date: {
              ...where.delivery_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.total_amountRange) {
        const [start, end] = filter.total_amountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            total_amount: {
              ...where.total_amount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            total_amount: {
              ...where.total_amount,
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

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.payment_status) {
        where = {
          ...where,
          payment_status: filter.payment_status,
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
          count: await db.orders.count({
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
      : await db.orders.findAndCountAll({
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
          Utils.ilike('orders', 'order_date', query),
        ],
      };
    }

    const records = await db.orders.findAll({
      attributes: ['id', 'order_date'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['order_date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.order_date,
    }));
  }
};
