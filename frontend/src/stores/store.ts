import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import customer_profilesSlice from './customer_profiles/customer_profilesSlice';
import deliveriesSlice from './deliveries/deliveriesSlice';
import feedbackSlice from './feedback/feedbackSlice';
import marketing_campaignsSlice from './marketing_campaigns/marketing_campaignsSlice';
import notificationsSlice from './notifications/notificationsSlice';
import order_itemsSlice from './order_items/order_itemsSlice';
import ordersSlice from './orders/ordersSlice';
import paymentsSlice from './payments/paymentsSlice';
import productsSlice from './products/productsSlice';
import subscriptionsSlice from './subscriptions/subscriptionsSlice';
import supplier_profilesSlice from './supplier_profiles/supplier_profilesSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    customer_profiles: customer_profilesSlice,
    deliveries: deliveriesSlice,
    feedback: feedbackSlice,
    marketing_campaigns: marketing_campaignsSlice,
    notifications: notificationsSlice,
    order_items: order_itemsSlice,
    orders: ordersSlice,
    payments: paymentsSlice,
    products: productsSlice,
    subscriptions: subscriptionsSlice,
    supplier_profiles: supplier_profilesSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
