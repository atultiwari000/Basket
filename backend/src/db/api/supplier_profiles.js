const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Supplier_profilesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier_profiles = await db.supplier_profiles.create(
      {
        id: data.id || undefined,

        company_name: data.company_name || null,
        contact_name: data.contact_name || null,
        contact_email: data.contact_email || null,
        contact_phone: data.contact_phone || null,
        address: data.address || null,
        certifications: data.certifications || null,
        rating: data.rating || null,
        profile_description: data.profile_description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await supplier_profiles.setSupplier(data.supplier || null, {
      transaction,
    });

    return supplier_profiles;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const supplier_profilesData = data.map((item, index) => ({
      id: item.id || undefined,

      company_name: item.company_name || null,
      contact_name: item.contact_name || null,
      contact_email: item.contact_email || null,
      contact_phone: item.contact_phone || null,
      address: item.address || null,
      certifications: item.certifications || null,
      rating: item.rating || null,
      profile_description: item.profile_description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const supplier_profiles = await db.supplier_profiles.bulkCreate(
      supplier_profilesData,
      { transaction },
    );

    // For each item created, replace relation files

    return supplier_profiles;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier_profiles = await db.supplier_profiles.findByPk(
      id,
      {},
      { transaction },
    );

    await supplier_profiles.update(
      {
        company_name: data.company_name || null,
        contact_name: data.contact_name || null,
        contact_email: data.contact_email || null,
        contact_phone: data.contact_phone || null,
        address: data.address || null,
        certifications: data.certifications || null,
        rating: data.rating || null,
        profile_description: data.profile_description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await supplier_profiles.setSupplier(data.supplier || null, {
      transaction,
    });

    return supplier_profiles;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier_profiles = await db.supplier_profiles.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of supplier_profiles) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of supplier_profiles) {
        await record.destroy({ transaction });
      }
    });

    return supplier_profiles;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const supplier_profiles = await db.supplier_profiles.findByPk(id, options);

    await supplier_profiles.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await supplier_profiles.destroy({
      transaction,
    });

    return supplier_profiles;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const supplier_profiles = await db.supplier_profiles.findOne(
      { where },
      { transaction },
    );

    if (!supplier_profiles) {
      return supplier_profiles;
    }

    const output = supplier_profiles.get({ plain: true });

    output.products_supplier = await supplier_profiles.getProducts_supplier({
      transaction,
    });

    output.supplier = await supplier_profiles.getSupplier({
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
        as: 'supplier',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.company_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'supplier_profiles',
            'company_name',
            filter.company_name,
          ),
        };
      }

      if (filter.contact_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'supplier_profiles',
            'contact_name',
            filter.contact_name,
          ),
        };
      }

      if (filter.contact_email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'supplier_profiles',
            'contact_email',
            filter.contact_email,
          ),
        };
      }

      if (filter.contact_phone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'supplier_profiles',
            'contact_phone',
            filter.contact_phone,
          ),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('supplier_profiles', 'address', filter.address),
        };
      }

      if (filter.certifications) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'supplier_profiles',
            'certifications',
            filter.certifications,
          ),
        };
      }

      if (filter.profile_description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'supplier_profiles',
            'profile_description',
            filter.profile_description,
          ),
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

      if (filter.supplier) {
        var listItems = filter.supplier.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          supplierId: { [Op.or]: listItems },
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
          count: await db.supplier_profiles.count({
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
      : await db.supplier_profiles.findAndCountAll({
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
          Utils.ilike('supplier_profiles', 'company_name', query),
        ],
      };
    }

    const records = await db.supplier_profiles.findAll({
      attributes: ['id', 'company_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['company_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.company_name,
    }));
  }
};
