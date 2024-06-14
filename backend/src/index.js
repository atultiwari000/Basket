const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const customer_profilesRoutes = require('./routes/customer_profiles');

const deliveriesRoutes = require('./routes/deliveries');

const feedbackRoutes = require('./routes/feedback');

const marketing_campaignsRoutes = require('./routes/marketing_campaigns');

const notificationsRoutes = require('./routes/notifications');

const order_itemsRoutes = require('./routes/order_items');

const ordersRoutes = require('./routes/orders');

const paymentsRoutes = require('./routes/payments');

const productsRoutes = require('./routes/products');

const subscriptionsRoutes = require('./routes/subscriptions');

const supplier_profilesRoutes = require('./routes/supplier_profiles');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Baske',
      description:
        'Baske Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/customer_profiles',
  passport.authenticate('jwt', { session: false }),
  customer_profilesRoutes,
);

app.use(
  '/api/deliveries',
  passport.authenticate('jwt', { session: false }),
  deliveriesRoutes,
);

app.use(
  '/api/feedback',
  passport.authenticate('jwt', { session: false }),
  feedbackRoutes,
);

app.use(
  '/api/marketing_campaigns',
  passport.authenticate('jwt', { session: false }),
  marketing_campaignsRoutes,
);

app.use(
  '/api/notifications',
  passport.authenticate('jwt', { session: false }),
  notificationsRoutes,
);

app.use(
  '/api/order_items',
  passport.authenticate('jwt', { session: false }),
  order_itemsRoutes,
);

app.use(
  '/api/orders',
  passport.authenticate('jwt', { session: false }),
  ordersRoutes,
);

app.use(
  '/api/payments',
  passport.authenticate('jwt', { session: false }),
  paymentsRoutes,
);

app.use(
  '/api/products',
  passport.authenticate('jwt', { session: false }),
  productsRoutes,
);

app.use(
  '/api/subscriptions',
  passport.authenticate('jwt', { session: false }),
  subscriptionsRoutes,
);

app.use(
  '/api/supplier_profiles',
  passport.authenticate('jwt', { session: false }),
  supplier_profilesRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
