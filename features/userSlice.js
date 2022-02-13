import { createSlice } from '@reduxjs/toolkit';
import { login as loginAPI, getUser as getUserAPI } from '../pages/api/webAPI';
import { setAuthToken } from '../utils/token';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
  },
  reducers: {
    setUserLogout: (state) => {
      state.user = '';
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setUserLogout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const userLogin = (router, payload) => (dispatch) => {
  return loginAPI(payload)
    .then((res) => {
      const data = {
        username: payload.username,
        role: res.data.role,
      };
      if (res.data.ok === 1) {
        setAuthToken(res.data.token);
        dispatch(setUser(data));
        dispatch(getUser());
        router.push('/');
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const userCheckoutLogin = (router, payload) => (dispatch) => {
  return loginAPI(payload)
    .then((res) => {
      const data = {
        username: payload.username,
        role: res.data.role,
      };
      if (res.data.ok === 1) {
        setAuthToken(res.data.token);
        dispatch(setUser(data));
        dispatch(getUser());
        router.push('/checkout');
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = () => async (dispatch) => {
  dispatch(setUserLogout());
  setAuthToken('');
};

export const getUser = () => async (dispatch) => {
  getUserAPI().then((res) => {
    if (res.data.ok === 1 && res.data.role === 'user') {
      const data = {
        username: res.data.username,
        role: res.data.role,
      };
      dispatch(setUser(data));
    }
  });
};

export default userSlice.reducer;
