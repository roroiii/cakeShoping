const USER_TOKEN = 'token';
const ADMIN_TOKEN = 'admin_token';

export const setAuthToken = (token) => {
  window.localStorage.setItem(USER_TOKEN, token);
};

export const getAuthToken = () => {
  return window.localStorage.getItem(USER_TOKEN);
};

export const checkAuthToken = () => {
  return window.localStorage.hasOwnProperty(USER_TOKEN);
};

export const setAdminAuthToken = (token) => {
  window.localStorage.setItem(ADMIN_TOKEN, token);
};

export const getAdminAuthToken = () => {
  return window.localStorage.getItem(ADMIN_TOKEN);
};

export const checkAdminAuthToken = () => {
  return window.localStorage.hasOwnProperty(ADMIN_TOKEN);
};
