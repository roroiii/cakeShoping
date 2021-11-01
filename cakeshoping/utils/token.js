const USER_TOKEN = 'token';
const ADMIN_TOKEN = 'admin_token';

export const setAuthToken = (token) => {
  window.localStorage.setItem(USER_TOKEN, token);
};

export const getAuthToken = () => {
  window.localStorage.getItem(USER_TOKEN);
};

export const setAdminAuthToken = (token) => {
  window.localStorage.setItem(ADMIN_TOKEN, token);
};

export const getAdminAuthToken = () => {
  window.localStorage.getItem(ADMIN_TOKEN);
};
