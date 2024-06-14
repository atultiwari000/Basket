const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Customer_profilesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer_profiles = await db.customer_profiles.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        address: data.address || null,
        phone_number: data.phone_number || null,
        preferences: data.preferences || null,
        subscription_status: data.subscription_status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await customer_profiles.setCustomer(data.customer || null, {
      transaction,
    });

    return customer_profiles;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const customer_profilesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      address: item.address || null,
      phone_number: item.phone_number || null,
      preferences: item.preferences || null,
      subscription_status: item.subscription_status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const customer_profiles = await db.customer_profiles.bulkCreate(
      customer_profilesData,
      { transaction },
    );

    // For each item created, replace relation files

    return customer_profiles;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer_profiles = await db.customer_profiles.findByPk(
      id,
      {},
      { transaction },
    );

    await customer_profiles.update(
      {
        name: data.name || null,
        address: data.address || null,
        phone_number: data.phone_number || null,
        preferences: data.preferences || null,
        subscription_status: data.subscription_status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await customer_profiles.setCustomer(data.customer || null, {
      transaction,
    });

    return customer_profiles;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer_profiles = await db.customer_profiles.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of customer_profiles) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of customer_profiles) {
        await record.destroy({ transaction });
      }
    });

    return customer_profiles;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const customer_profiles = await db.customer_profiles.findByPk(id, options);

    await customer_profiles.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await customer_profiles.destroy({
      transaction,
    });

    return customer_profiles;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const customer_profiles = await db.customer_profiles.findOne(
      { where },
      { transaction },
    );

    if (!customer_profiles) {
      return customer_profiles;
    }

    const output = customer_profiles.get({ plain: true });

    output.feedback_customer = await customer_profiles.getFeedback_customer({
      transaction,
    });

    output.orders_customer = await customer_profiles.getOrders_customer({
      transaction,
    });

    output.payments_customer = await customer_profiles.getPayments_customer({
      transaction,
    });

    output.subscriptions_customer =
      await customer_profiles.getSubscriptions_customer({
        transaction,
      });

    output.customer = await customer_profiles.getCustomer({
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
        model: db.users,
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

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customer_profiles', 'name', filter.name),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('customer_profiles', 'address', filter.address),
        };
      }

      if (filter.phone_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customer_profiles',
            'phone_number',
            filter.phone_number,
          ),
        };
      }

      if (filter.preferences) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customer_profiles',
            'preferences',
            filter.preferences,
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

      if (filter.subscription_status) {
        where = {
          ...where,
          subscription_status: filter.subscription_status,
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
          count: await db.customer_profiles.count({
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
      : await db.customer_profiles.findAndCountAll({
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
          Utils.ilike('customer_profiles', 'name', query),
        ],
      };
    }

    const records = await db.customer_profiles.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
