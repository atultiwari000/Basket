const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const customer_profiles = sequelize.define(
    'customer_profiles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      address: {
        type: DataTypes.TEXT,
      },

      phone_number: {
        type: DataTypes.TEXT,
      },

      preferences: {
        type: DataTypes.TEXT,
      },

      subscription_status: {
        type: DataTypes.ENUM,

        values: ['active', 'paused', 'canceled'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  customer_profiles.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.customer_profiles.hasMany(db.feedback, {
      as: 'feedback_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.customer_profiles.hasMany(db.orders, {
      as: 'orders_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.customer_profiles.hasMany(db.payments, {
      as: 'payments_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.customer_profiles.hasMany(db.subscriptions, {
      as: 'subscriptions_customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    //end loop

    db.customer_profiles.belongsTo(db.users, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.customer_profiles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.customer_profiles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return customer_profiles;
};
