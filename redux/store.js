import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import adminUserReducer from '../features/adminUserSlice';
import loadingReducer from '../features/loadingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminUser: adminUserReducer,
    loading: loadingReducer,
  },
});

export default store;
