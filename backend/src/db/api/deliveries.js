const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DeliveriesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const deliveries = await db.deliveries.create(
      {
        id: data.id || undefined,

        pickup_status: data.pickup_status || null,
        delivery_status: data.delivery_status || null,
        special_instructions: data.special_instructions || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await deliveries.setOrder(data.order || null, {
      transaction,
    });

    await deliveries.setDelivery_staff(data.delivery_staff || null, {
      transaction,
    });

    return deliveries;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const deliveriesData = data.map((item, index) => ({
      id: item.id || undefined,

      pickup_status: item.pickup_status || null,
      delivery_status: item.delivery_status || null,
      special_instructions: item.special_instructions || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const deliveries = await db.deliveries.bulkCreate(deliveriesData, {
      transaction,
    });

    // For each item created, replace relation files

    return deliveries;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const deliveries = await db.deliveries.findByPk(id, {}, { transaction });

    await deliveries.update(
      {
        pickup_status: data.pickup_status || null,
        delivery_status: data.delivery_status || null,
        special_instructions: data.special_instructions || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await deliveries.setOrder(data.order || null, {
      transaction,
    });

    await deliveries.setDelivery_staff(data.delivery_staff || null, {
      transaction,
    });

    return deliveries;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const deliveries = await db.deliveries.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of deliveries) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of deliveries) {
        await record.destroy({ transaction });
      }
    });

    return deliveries;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const deliveries = await db.deliveries.findByPk(id, options);

    await deliveries.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await deliveries.destroy({
      transaction,
    });

    return deliveries;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const deliveries = await db.deliveries.findOne({ where }, { transaction });

    if (!deliveries) {
      return deliveries;
    }

    const output = deliveries.get({ plain: true });

    output.order = await deliveries.getOrder({
      transaction,
    });

    output.delivery_staff = await deliveries.getDelivery_staff({
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
        model: db.users,
        as: 'delivery_staff',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.special_instructions) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'deliveries',
            'special_instructions',
            filter.special_instructions,
          ),
        };
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

      if (filter.pickup_status) {
        where = {
          ...where,
          pickup_status: filter.pickup_status,
        };
      }

      if (filter.delivery_status) {
        where = {
          ...where,
          delivery_status: filter.delivery_status,
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

      if (filter.delivery_staff) {
        var listItems = filter.delivery_staff.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          delivery_staffId: { [Op.or]: listItems },
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
          count: await db.deliveries.count({
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
      : await db.deliveries.findAndCountAll({
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
          Utils.ilike('deliveries', 'order', query),
        ],
      };
    }

    const records = await db.deliveries.findAll({
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
