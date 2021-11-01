import { server } from '../config';
import axios from 'axios';
import { getAdminAuthToken } from '../utils/token';

export const adminLogin = async (payload) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${server}/admain`,
      data: payload,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAdmin = async () => {
  try {
    const token = getAdminAuthToken();
    const res = await axios({
      method: 'GET',
      url: `${server}/user`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
