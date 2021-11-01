import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  adminLogin as adminLoginAPI,
  getAdmin as getAdminAPI,
} from '../api/AdminAPI';
import { setAdminAuthToken, getAdminAuthToken } from '../utils/token';
export const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState: {
    user: '',
  },
  reducers: {
    // setLogin: (state, action) => {
    //   state.user = action.payload;
    // },
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
      };
      if (res.data.ok === 1) {
        setAdminAuthToken(res.data.token);
        router.push('/');
      }
      dispatch(setAdmin(data));
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const adminLogout = () => (dispatch) => {
  dispatch(setLogout());
  setAdminAuthToken(null);
};

export const getAdmin = () => (dispatch) => {
  getAdminAPI().then((res) => {
    // if (res.data.ok === 1) {
    //   const data = {
    //     username: payload.username,
    //   };
    //   dispatch(setAdmin(data));
    // }
    console.log(res);
  });
};

export default adminUserSlice.reducer;
