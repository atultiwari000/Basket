const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const supplier_profiles = sequelize.define(
    'supplier_profiles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      company_name: {
        type: DataTypes.TEXT,
      },

      contact_name: {
        type: DataTypes.TEXT,
      },

      contact_email: {
        type: DataTypes.TEXT,
      },

      contact_phone: {
        type: DataTypes.TEXT,
      },

      address: {
        type: DataTypes.TEXT,
      },

      certifications: {
        type: DataTypes.TEXT,
      },

      rating: {
        type: DataTypes.DECIMAL,
      },

      profile_description: {
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

  supplier_profiles.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.supplier_profiles.hasMany(db.products, {
      as: 'products_supplier',
      foreignKey: {
        name: 'supplierId',
      },
      constraints: false,
    });

    //end loop

    db.supplier_profiles.belongsTo(db.users, {
      as: 'supplier',
      foreignKey: {
        name: 'supplierId',
      },
      constraints: false,
    });

    db.supplier_profiles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.supplier_profiles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return supplier_profiles;
};
