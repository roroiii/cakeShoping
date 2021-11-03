import { createSlice } from '@reduxjs/toolkit';
import {
  adminLogin as adminLoginAPI,
  getAdmin as getAdminAPI,
} from '../pages/api/webAPI';
import { setAdminAuthToken } from '../utils/token';
export const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState: {
    user: '',
  },
  reducers: {
    setLogout: (state) => {
      state.user = '';
    },
    setAdmin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAdmin, setLogout } = adminUserSlice.actions;

export const selectAdminUser = (state) => state.adminUser.user;

export const adminLogin = (router, payload) => (dispatch) => {
  return adminLoginAPI(payload)
    .then((res) => {
      const data = {
        username: payload.username,
        role: res.data.role,
      };
      if (res.data.ok === 1) {
        setAdminAuthToken(res.data.token);
        dispatch(setAdmin(data));
        dispatch(getAdmin());
        router.push('/');
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const adminLogout = () => async (dispatch) => {
  dispatch(setLogout());
  setAdminAuthToken(null);
};

export const getAdmin = () => async (dispatch) => {
  getAdminAPI().then((res) => {
    if (res.data.ok === 1 && res.data.role === 'admin') {
      const data = {
        username: res.data.username,
        role: res.data.role,
      };
      dispatch(setAdmin(data));
    }
  });
};

export default adminUserSlice.reducer;
