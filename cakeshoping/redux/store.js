import { configureStore } from '@reduxjs/toolkit';
import adminUserReducer from '../features/adminUserSlice';

export const store = configureStore({
  reducer: {
    adminUser: adminUserReducer,
  },
});

export default store;
