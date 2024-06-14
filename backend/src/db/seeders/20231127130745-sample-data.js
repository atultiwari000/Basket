const db = require('../models');
const Users = db.users;

const CustomerProfiles = db.customer_profiles;

const Deliveries = db.deliveries;

const Feedback = db.feedback;

const MarketingCampaigns = db.marketing_campaigns;

const Notifications = db.notifications;

const OrderItems = db.order_items;

const Orders = db.orders;

const Payments = db.payments;

const Products = db.products;

const Subscriptions = db.subscriptions;

const SupplierProfiles = db.supplier_profiles;

const CustomerProfilesData = [
  {
    // type code here for "relation_one" field

    name: 'Charles Darwin',

    address: 'Albert Einstein',

    phone_number: 'Wilhelm Wundt',

    preferences: 'Paul Ehrlich',

    subscription_status: 'active',
  },

  {
    // type code here for "relation_one" field

    name: 'William Herschel',

    address: 'Michael Faraday',

    phone_number: 'Euclid',

    preferences: 'Michael Faraday',

    subscription_status: 'active',
  },

  {
    // type code here for "relation_one" field

    name: 'Frederick Sanger',

    address: 'Franz Boas',

    phone_number: 'Paul Ehrlich',

    preferences: 'Albrecht von Haller',

    subscription_status: 'paused',
  },
];

const DeliveriesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    pickup_status: 'pending',

    delivery_status: 'en_route',

    special_instructions: 'Comte de Buffon',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    pickup_status: 'pending',

    delivery_status: 'en_route',

    special_instructions: 'Joseph J. Thomson',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    pickup_status: 'pending',

    delivery_status: 'en_route',

    special_instructions: 'Max von Laue',
  },
];

const FeedbackData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 36.74,

    comments: 'Trofim Lysenko',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 16.68,

    comments: 'Karl Landsteiner',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 14.41,

    comments: 'Gregor Mendel',
  },
];

const MarketingCampaignsData = [
  {
    name: 'Edward O. Wilson',

    description: 'Linus Pauling',

    start_date: new Date(),

    end_date: new Date(),

    target_audience: 'Archimedes',

    status: 'inactive',
  },

  {
    name: 'Hermann von Helmholtz',

    description: 'J. Robert Oppenheimer',

    start_date: new Date(),

    end_date: new Date(),

    target_audience: 'August Kekule',

    status: 'active',
  },

  {
    name: 'Max von Laue',

    description: 'Hermann von Helmholtz',

    start_date: new Date(),

    end_date: new Date(),

    target_audience: 'Jonas Salk',

    status: 'active',
  },
];

const NotificationsData = [
  {
    // type code here for "relation_one" field

    message: 'Leonard Euler',

    read_status: 'unread',
  },

  {
    // type code here for "relation_one" field

    message: 'Enrico Fermi',

    read_status: 'read',
  },

  {
    // type code here for "relation_one" field

    message: 'J. Robert Oppenheimer',

    read_status: 'unread',
  },
];

const OrderItemsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 5,

    price: 12.32,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 5,

    price: 90.97,
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 7,

    price: 91.76,
  },
];

const OrdersData = [
  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-01T08:00:00Z'),

    delivery_date: new Date('2023-10-01T10:00:00Z'),

    status: 'fulfilled',

    total_amount: 81.31,

    payment_status: 'paid',
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-02T08:00:00Z'),

    delivery_date: new Date('2023-10-02T10:00:00Z'),

    status: 'pending',

    total_amount: 73.11,

    payment_status: 'paid',
  },

  {
    // type code here for "relation_one" field

    order_date: new Date('2023-10-03T08:00:00Z'),

    delivery_date: new Date('2023-10-03T10:00:00Z'),

    status: 'fulfilled',

    total_amount: 79.02,

    payment_status: 'paid',
  },
];

const PaymentsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    amount: 89.15,

    payment_date: new Date(),

    payment_method: 'Max Delbruck',

    status: 'paid',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    amount: 89.95,

    payment_date: new Date(),

    payment_method: 'Emil Fischer',

    status: 'paid',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    amount: 35.03,

    payment_date: new Date(),

    payment_method: 'J. Robert Oppenheimer',

    status: 'unpaid',
  },
];

const ProductsData = [
  {
    // type code here for "relation_one" field

    name: 'Organic Milk',

    description: 'Fresh organic milk delivered daily.',

    category: 'Daily Products',

    price: 2.5,

    stock_quantity: 5,

    unit: 'Charles Lyell',
  },

  {
    // type code here for "relation_one" field

    name: 'Whole Wheat Bread',

    description: 'Healthy whole wheat bread.',

    category: 'Daily Products',

    price: 1.5,

    stock_quantity: 3,

    unit: 'Werner Heisenberg',
  },

  {
    // type code here for "relation_one" field

    name: 'Free Range Eggs',

    description: 'Fresh free range eggs.',

    category: 'Weekly Products',

    price: 3,

    stock_quantity: 4,

    unit: 'Carl Gauss (Karl Friedrich Gauss)',
  },
];

const SubscriptionsData = [
  {
    // type code here for "relation_one" field

    frequency: 'daily',

    start_date: new Date('2023-10-01T00:00:00Z'),

    end_date: new Date('2023-12-31T00:00:00Z'),

    status: 'canceled',
  },

  {
    // type code here for "relation_one" field

    frequency: 'weekly',

    start_date: new Date('2023-10-01T00:00:00Z'),

    end_date: new Date('2023-12-31T00:00:00Z'),

    status: 'paused',
  },

  {
    // type code here for "relation_one" field

    frequency: 'weekly',

    start_date: new Date('2023-10-01T00:00:00Z'),

    end_date: new Date('2023-12-31T00:00:00Z'),

    status: 'paused',
  },
];

const SupplierProfilesData = [
  {
    // type code here for "relation_one" field

    company_name: 'Edwin Hubble',

    contact_name: 'Paul Dirac',

    contact_email: 'Joseph J. Thomson',

    contact_phone: 'Karl Landsteiner',

    address: 'Karl Landsteiner',

    certifications: 'Isaac Newton',

    rating: 37.03,

    profile_description: 'J. Robert Oppenheimer',
  },

  {
    // type code here for "relation_one" field

    company_name: 'Ernst Mayr',

    contact_name: 'Francis Galton',

    contact_email: 'William Herschel',

    contact_phone: 'Alfred Wegener',

    address: 'William Harvey',

    certifications: 'William Herschel',

    rating: 59.01,

    profile_description: 'Alexander Fleming',
  },

  {
    // type code here for "relation_one" field

    company_name: 'Willard Libby',

    contact_name: 'Alfred Kinsey',

    contact_email: 'Charles Lyell',

    contact_phone: 'Anton van Leeuwenhoek',

    address: 'Comte de Buffon',

    certifications: 'Louis Pasteur',

    rating: 72.96,

    profile_description: 'William Harvey',
  },
];

// Similar logic for "relation_many"

async function associateCustomerProfileWithCustomer() {
  const relatedCustomer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CustomerProfile0 = await CustomerProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CustomerProfile0?.setCustomer) {
    await CustomerProfile0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CustomerProfile1 = await CustomerProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CustomerProfile1?.setCustomer) {
    await CustomerProfile1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CustomerProfile2 = await CustomerProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CustomerProfile2?.setCustomer) {
    await CustomerProfile2.setCustomer(relatedCustomer2);
  }
}

async function associateDeliveryWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Delivery0 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Delivery0?.setOrder) {
    await Delivery0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Delivery1 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Delivery1?.setOrder) {
    await Delivery1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Delivery2 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Delivery2?.setOrder) {
    await Delivery2.setOrder(relatedOrder2);
  }
}

async function associateDeliveryWithDelivery_staff() {
  const relatedDelivery_staff0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Delivery0 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Delivery0?.setDelivery_staff) {
    await Delivery0.setDelivery_staff(relatedDelivery_staff0);
  }

  const relatedDelivery_staff1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Delivery1 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Delivery1?.setDelivery_staff) {
    await Delivery1.setDelivery_staff(relatedDelivery_staff1);
  }

  const relatedDelivery_staff2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Delivery2 = await Deliveries.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Delivery2?.setDelivery_staff) {
    await Delivery2.setDelivery_staff(relatedDelivery_staff2);
  }
}

async function associateFeedbackWithCustomer() {
  const relatedCustomer0 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Feedback0 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Feedback0?.setCustomer) {
    await Feedback0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Feedback1 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Feedback1?.setCustomer) {
    await Feedback1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Feedback2 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Feedback2?.setCustomer) {
    await Feedback2.setCustomer(relatedCustomer2);
  }
}

async function associateFeedbackWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Feedback0 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Feedback0?.setProduct) {
    await Feedback0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Feedback1 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Feedback1?.setProduct) {
    await Feedback1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Feedback2 = await Feedback.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Feedback2?.setProduct) {
    await Feedback2.setProduct(relatedProduct2);
  }
}

async function associateNotificationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setUser) {
    await Notification0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setUser) {
    await Notification1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setUser) {
    await Notification2.setUser(relatedUser2);
  }
}

async function associateOrderItemWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem0 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (OrderItem0?.setOrder) {
    await OrderItem0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem1 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (OrderItem1?.setOrder) {
    await OrderItem1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const OrderItem2 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (OrderItem2?.setOrder) {
    await OrderItem2.setOrder(relatedOrder2);
  }
}

async function associateOrderItemWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem0 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (OrderItem0?.setProduct) {
    await OrderItem0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem1 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (OrderItem1?.setProduct) {
    await OrderItem1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const OrderItem2 = await OrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (OrderItem2?.setProduct) {
    await OrderItem2.setProduct(relatedProduct2);
  }
}

async function associateOrderWithCustomer() {
  const relatedCustomer0 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setCustomer) {
    await Order0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setCustomer) {
    await Order1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setCustomer) {
    await Order2.setCustomer(relatedCustomer2);
  }
}

async function associatePaymentWithOrder() {
  const relatedOrder0 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setOrder) {
    await Payment0.setOrder(relatedOrder0);
  }

  const relatedOrder1 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setOrder) {
    await Payment1.setOrder(relatedOrder1);
  }

  const relatedOrder2 = await Orders.findOne({
    offset: Math.floor(Math.random() * (await Orders.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setOrder) {
    await Payment2.setOrder(relatedOrder2);
  }
}

async function associatePaymentWithCustomer() {
  const relatedCustomer0 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setCustomer) {
    await Payment0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setCustomer) {
    await Payment1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setCustomer) {
    await Payment2.setCustomer(relatedCustomer2);
  }
}

async function associateProductWithSupplier() {
  const relatedSupplier0 = await SupplierProfiles.findOne({
    offset: Math.floor(Math.random() * (await SupplierProfiles.count())),
  });
  const Product0 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Product0?.setSupplier) {
    await Product0.setSupplier(relatedSupplier0);
  }

  const relatedSupplier1 = await SupplierProfiles.findOne({
    offset: Math.floor(Math.random() * (await SupplierProfiles.count())),
  });
  const Product1 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Product1?.setSupplier) {
    await Product1.setSupplier(relatedSupplier1);
  }

  const relatedSupplier2 = await SupplierProfiles.findOne({
    offset: Math.floor(Math.random() * (await SupplierProfiles.count())),
  });
  const Product2 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Product2?.setSupplier) {
    await Product2.setSupplier(relatedSupplier2);
  }
}

async function associateSubscriptionWithCustomer() {
  const relatedCustomer0 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Subscription0 = await Subscriptions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Subscription0?.setCustomer) {
    await Subscription0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Subscription1 = await Subscriptions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Subscription1?.setCustomer) {
    await Subscription1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await CustomerProfiles.findOne({
    offset: Math.floor(Math.random() * (await CustomerProfiles.count())),
  });
  const Subscription2 = await Subscriptions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Subscription2?.setCustomer) {
    await Subscription2.setCustomer(relatedCustomer2);
  }
}

async function associateSupplierProfileWithSupplier() {
  const relatedSupplier0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupplierProfile0 = await SupplierProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (SupplierProfile0?.setSupplier) {
    await SupplierProfile0.setSupplier(relatedSupplier0);
  }

  const relatedSupplier1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupplierProfile1 = await SupplierProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (SupplierProfile1?.setSupplier) {
    await SupplierProfile1.setSupplier(relatedSupplier1);
  }

  const relatedSupplier2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupplierProfile2 = await SupplierProfiles.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (SupplierProfile2?.setSupplier) {
    await SupplierProfile2.setSupplier(relatedSupplier2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await CustomerProfiles.bulkCreate(CustomerProfilesData);

    await Deliveries.bulkCreate(DeliveriesData);

    await Feedback.bulkCreate(FeedbackData);

    await MarketingCampaigns.bulkCreate(MarketingCampaignsData);

    await Notifications.bulkCreate(NotificationsData);

    await OrderItems.bulkCreate(OrderItemsData);

    await Orders.bulkCreate(OrdersData);

    await Payments.bulkCreate(PaymentsData);

    await Products.bulkCreate(ProductsData);

    await Subscriptions.bulkCreate(SubscriptionsData);

    await SupplierProfiles.bulkCreate(SupplierProfilesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateCustomerProfileWithCustomer(),

      await associateDeliveryWithOrder(),

      await associateDeliveryWithDelivery_staff(),

      await associateFeedbackWithCustomer(),

      await associateFeedbackWithProduct(),

      await associateNotificationWithUser(),

      await associateOrderItemWithOrder(),

      await associateOrderItemWithProduct(),

      await associateOrderWithCustomer(),

      await associatePaymentWithOrder(),

      await associatePaymentWithCustomer(),

      await associateProductWithSupplier(),

      await associateSubscriptionWithCustomer(),

      await associateSupplierProfileWithSupplier(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customer_profiles', null, {});

    await queryInterface.bulkDelete('deliveries', null, {});

    await queryInterface.bulkDelete('feedback', null, {});

    await queryInterface.bulkDelete('marketing_campaigns', null, {});

    await queryInterface.bulkDelete('notifications', null, {});

    await queryInterface.bulkDelete('order_items', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('payments', null, {});

    await queryInterface.bulkDelete('products', null, {});

    await queryInterface.bulkDelete('subscriptions', null, {});

    await queryInterface.bulkDelete('supplier_profiles', null, {});
  },
};
