module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'customer_profiles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'deliveries',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'feedback',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'marketing_campaigns',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'notifications',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'order_items',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'orders',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'payments',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'products',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'subscriptions',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'supplier_profiles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'roles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'permissions',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer_profiles',
        'customerId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer_profiles',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer_profiles',
        'address',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer_profiles',
        'phone_number',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer_profiles',
        'preferences',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'customer_profiles',
        'subscription_status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['active', 'paused', 'canceled'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'deliveries',
        'orderId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'orders',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'deliveries',
        'delivery_staffId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'deliveries',
        'pickup_status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['pending', 'picked_up'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'deliveries',
        'delivery_status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['pending', 'en_route', 'delivered'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'deliveries',
        'special_instructions',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'feedback',
        'customerId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'customer_profiles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'feedback',
        'productId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'products',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'feedback',
        'rating',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'feedback',
        'comments',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'marketing_campaigns',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'marketing_campaigns',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'marketing_campaigns',
        'start_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'marketing_campaigns',
        'end_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'marketing_campaigns',
        'target_audience',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'marketing_campaigns',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['active', 'inactive'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'notifications',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'notifications',
        'message',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'notifications',
        'read_status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['read', 'unread'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'order_items',
        'orderId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'orders',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'order_items',
        'productId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'products',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'order_items',
        'quantity',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'order_items',
        'price',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'customerId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'customer_profiles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'order_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'delivery_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['pending', 'fulfilled', 'canceled'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'total_amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'payment_status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['paid', 'unpaid'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'payments',
        'orderId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'orders',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'payments',
        'customerId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'customer_profiles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'payments',
        'amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'payments',
        'payment_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'payments',
        'payment_method',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'payments',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['paid', 'unpaid'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'products',
        'supplierId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'supplier_profiles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'products',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'products',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'products',
        'category',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'products',
        'price',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'products',
        'stock_quantity',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'products',
        'unit',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'subscriptions',
        'customerId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'customer_profiles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'subscriptions',
        'frequency',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['daily', 'weekly', 'monthly'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'subscriptions',
        'start_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'subscriptions',
        'end_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'subscriptions',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['active', 'paused', 'canceled'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'supplierId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'company_name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'contact_name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'contact_email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'contact_phone',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'address',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'certifications',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'rating',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'supplier_profiles',
        'profile_description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'permissions',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'role_customization',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'app_roleId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'roles',
            key: 'id',
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('users', 'app_roleId', { transaction });

      await queryInterface.removeColumn('roles', 'role_customization', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'name', { transaction });

      await queryInterface.removeColumn('permissions', 'name', { transaction });

      await queryInterface.removeColumn(
        'supplier_profiles',
        'profile_description',
        { transaction },
      );

      await queryInterface.removeColumn('supplier_profiles', 'rating', {
        transaction,
      });

      await queryInterface.removeColumn('supplier_profiles', 'certifications', {
        transaction,
      });

      await queryInterface.removeColumn('supplier_profiles', 'address', {
        transaction,
      });

      await queryInterface.removeColumn('supplier_profiles', 'contact_phone', {
        transaction,
      });

      await queryInterface.removeColumn('supplier_profiles', 'contact_email', {
        transaction,
      });

      await queryInterface.removeColumn('supplier_profiles', 'contact_name', {
        transaction,
      });

      await queryInterface.removeColumn('supplier_profiles', 'company_name', {
        transaction,
      });

      await queryInterface.removeColumn('supplier_profiles', 'supplierId', {
        transaction,
      });

      await queryInterface.removeColumn('subscriptions', 'status', {
        transaction,
      });

      await queryInterface.removeColumn('subscriptions', 'end_date', {
        transaction,
      });

      await queryInterface.removeColumn('subscriptions', 'start_date', {
        transaction,
      });

      await queryInterface.removeColumn('subscriptions', 'frequency', {
        transaction,
      });

      await queryInterface.removeColumn('subscriptions', 'customerId', {
        transaction,
      });

      await queryInterface.removeColumn('products', 'unit', { transaction });

      await queryInterface.removeColumn('products', 'stock_quantity', {
        transaction,
      });

      await queryInterface.removeColumn('products', 'price', { transaction });

      await queryInterface.removeColumn('products', 'category', {
        transaction,
      });

      await queryInterface.removeColumn('products', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('products', 'name', { transaction });

      await queryInterface.removeColumn('products', 'supplierId', {
        transaction,
      });

      await queryInterface.removeColumn('payments', 'status', { transaction });

      await queryInterface.removeColumn('payments', 'payment_method', {
        transaction,
      });

      await queryInterface.removeColumn('payments', 'payment_date', {
        transaction,
      });

      await queryInterface.removeColumn('payments', 'amount', { transaction });

      await queryInterface.removeColumn('payments', 'customerId', {
        transaction,
      });

      await queryInterface.removeColumn('payments', 'orderId', { transaction });

      await queryInterface.removeColumn('orders', 'payment_status', {
        transaction,
      });

      await queryInterface.removeColumn('orders', 'total_amount', {
        transaction,
      });

      await queryInterface.removeColumn('orders', 'status', { transaction });

      await queryInterface.removeColumn('orders', 'delivery_date', {
        transaction,
      });

      await queryInterface.removeColumn('orders', 'order_date', {
        transaction,
      });

      await queryInterface.removeColumn('orders', 'customerId', {
        transaction,
      });

      await queryInterface.removeColumn('order_items', 'price', {
        transaction,
      });

      await queryInterface.removeColumn('order_items', 'quantity', {
        transaction,
      });

      await queryInterface.removeColumn('order_items', 'productId', {
        transaction,
      });

      await queryInterface.removeColumn('order_items', 'orderId', {
        transaction,
      });

      await queryInterface.removeColumn('notifications', 'read_status', {
        transaction,
      });

      await queryInterface.removeColumn('notifications', 'message', {
        transaction,
      });

      await queryInterface.removeColumn('notifications', 'userId', {
        transaction,
      });

      await queryInterface.removeColumn('marketing_campaigns', 'status', {
        transaction,
      });

      await queryInterface.removeColumn(
        'marketing_campaigns',
        'target_audience',
        { transaction },
      );

      await queryInterface.removeColumn('marketing_campaigns', 'end_date', {
        transaction,
      });

      await queryInterface.removeColumn('marketing_campaigns', 'start_date', {
        transaction,
      });

      await queryInterface.removeColumn('marketing_campaigns', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('marketing_campaigns', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('feedback', 'comments', {
        transaction,
      });

      await queryInterface.removeColumn('feedback', 'rating', { transaction });

      await queryInterface.removeColumn('feedback', 'productId', {
        transaction,
      });

      await queryInterface.removeColumn('feedback', 'customerId', {
        transaction,
      });

      await queryInterface.removeColumn('deliveries', 'special_instructions', {
        transaction,
      });

      await queryInterface.removeColumn('deliveries', 'delivery_status', {
        transaction,
      });

      await queryInterface.removeColumn('deliveries', 'pickup_status', {
        transaction,
      });

      await queryInterface.removeColumn('deliveries', 'delivery_staffId', {
        transaction,
      });

      await queryInterface.removeColumn('deliveries', 'orderId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'customer_profiles',
        'subscription_status',
        { transaction },
      );

      await queryInterface.removeColumn('customer_profiles', 'preferences', {
        transaction,
      });

      await queryInterface.removeColumn('customer_profiles', 'phone_number', {
        transaction,
      });

      await queryInterface.removeColumn('customer_profiles', 'address', {
        transaction,
      });

      await queryInterface.removeColumn('customer_profiles', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('customer_profiles', 'customerId', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('permissions', { transaction });

      await queryInterface.dropTable('roles', { transaction });

      await queryInterface.dropTable('supplier_profiles', { transaction });

      await queryInterface.dropTable('subscriptions', { transaction });

      await queryInterface.dropTable('products', { transaction });

      await queryInterface.dropTable('payments', { transaction });

      await queryInterface.dropTable('orders', { transaction });

      await queryInterface.dropTable('order_items', { transaction });

      await queryInterface.dropTable('notifications', { transaction });

      await queryInterface.dropTable('marketing_campaigns', { transaction });

      await queryInterface.dropTable('feedback', { transaction });

      await queryInterface.dropTable('deliveries', { transaction });

      await queryInterface.dropTable('customer_profiles', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
