const USER_TOKEN = 'token';
const ADMIN_TOKEN = 'admin_token';
const isBrowser = typeof window !== undefined;

export const setAuthToken = (token) => {
  window.localStorage.setItem(USER_TOKEN, token);
};

export const getAuthToken = () => {
  if (isBrowser) {
    return window.localStorage.getItem(USER_TOKEN);
  }
};

export const checkAuthToken = () => {
  if (isBrowser) {
    return window.localStorage.hasOwnProperty(USER_TOKEN);
  }
};

export const setAdminAuthToken = (token) => {
  window.localStorage.setItem(ADMIN_TOKEN, token);
};

export const getAdminAuthToken = () => {
  if (isBrowser) {
    return window.localStorage.getItem(ADMIN_TOKEN);
  }
};

export const checkAdminAuthToken = () => {
  if (isBrowser) {
    return window.localStorage.hasOwnProperty(ADMIN_TOKEN);
  }
};
