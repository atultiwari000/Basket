const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const deliveries = sequelize.define(
    'deliveries',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      pickup_status: {
        type: DataTypes.ENUM,

        values: ['pending', 'picked_up'],
      },

      delivery_status: {
        type: DataTypes.ENUM,

        values: ['pending', 'en_route', 'delivered'],
      },

      special_instructions: {
        type: DataTypes.TEXT,
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

  deliveries.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.deliveries.belongsTo(db.orders, {
      as: 'order',
      foreignKey: {
        name: 'orderId',
      },
      constraints: false,
    });

    db.deliveries.belongsTo(db.users, {
      as: 'delivery_staff',
      foreignKey: {
        name: 'delivery_staffId',
      },
      constraints: false,
    });

    db.deliveries.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.deliveries.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return deliveries;
};
