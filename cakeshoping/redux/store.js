import { configureStore } from '@reduxjs/toolkit';
import adminUserReducer from '../features/adminUserSlice';
import loadingReducer from '../features/loadingSlice';

export const store = configureStore({
  reducer: {
    adminUser: adminUserReducer,
    loading: loadingReducer,
  },
});

export default store;
