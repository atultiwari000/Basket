import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/customer_profiles/customer_profiles-list',
    label: 'Customer profiles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccount ? icon.mdiAccount : icon.mdiTable,
    permissions: 'READ_CUSTOMER_PROFILES',
  },
  {
    href: '/deliveries/deliveries-list',
    label: 'Deliveries',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTruck ? icon.mdiTruck : icon.mdiTable,
    permissions: 'READ_DELIVERIES',
  },
  {
    href: '/feedback/feedback-list',
    label: 'Feedback',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiComment ? icon.mdiComment : icon.mdiTable,
    permissions: 'READ_FEEDBACK',
  },
  {
    href: '/marketing_campaigns/marketing_campaigns-list',
    label: 'Marketing campaigns',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiBullhorn ? icon.mdiBullhorn : icon.mdiTable,
    permissions: 'READ_MARKETING_CAMPAIGNS',
  },
  {
    href: '/notifications/notifications-list',
    label: 'Notifications',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiBell ? icon.mdiBell : icon.mdiTable,
    permissions: 'READ_NOTIFICATIONS',
  },
  {
    href: '/order_items/order_items-list',
    label: 'Order items',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFormatListBulleted
      ? icon.mdiFormatListBulleted
      : icon.mdiTable,
    permissions: 'READ_ORDER_ITEMS',
  },
  {
    href: '/orders/orders-list',
    label: 'Orders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCart ? icon.mdiCart : icon.mdiTable,
    permissions: 'READ_ORDERS',
  },
  {
    href: '/payments/payments-list',
    label: 'Payments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCreditCard ? icon.mdiCreditCard : icon.mdiTable,
    permissions: 'READ_PAYMENTS',
  },
  {
    href: '/products/products-list',
    label: 'Products',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiPackageVariant ? icon.mdiPackageVariant : icon.mdiTable,
    permissions: 'READ_PRODUCTS',
  },
  {
    href: '/subscriptions/subscriptions-list',
    label: 'Subscriptions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCalendar ? icon.mdiCalendar : icon.mdiTable,
    permissions: 'READ_SUBSCRIPTIONS',
  },
  {
    href: '/supplier_profiles/supplier_profiles-list',
    label: 'Supplier profiles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFactory ? icon.mdiFactory : icon.mdiTable,
    permissions: 'READ_SUPPLIER_PROFILES',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
