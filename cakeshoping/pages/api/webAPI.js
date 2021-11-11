import { server } from '../../config';
import axios from 'axios';
import { setLoading } from '../../features/loadingSlice';
import { getAuthToken, getAdminAuthToken } from '../../utils/token';

const instance = axios.create({
  baseURL: server,
  withCredentials: false,
});

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
};

export const interceptor = (store) => {
  instance.interceptors.request.use((config) => {
    const url = config.url.split('/')[1];
    if (url === 'product' || url === 'order') {
      return config;
    } else {
      store.dispatch(setLoading(true));
      return config;
    }
  });
  instance.interceptors.response.use(
    (response) => {
      store.dispatch(setLoading(false));
      return response;
    },
    (error) => {
      if (error.response) {
        const { message } = error.response.data;
        store.dispatch(setLoading(false));
        console.log(message);
      }
      return Promise.reject(error);
    }
  );
};

export const adminLogin = (payload) => instance.post(`/admain`, payload);

export const login = (payload) => instance.post(`/login`, payload);

export const getProducts = () => instance.get(`/product`);
export const getProduct = (id) => instance.get(`/product/${id}`);

export const deleteProduct = async (id) => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'DELETE',
      url: `${server}/product/${id}`,
      headers: {
        authorization: adminToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = async (data) => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'PATCH',
      url: `${server}/product/`,
      headers: {
        authorization: adminToken,
      },
      data,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const addProduct = async (data) => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'POST',
      url: `${server}/product/`,
      headers: {
        authorization: adminToken,
      },
      data,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const productOnAndOffStatus = async (id, status) => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'POST',
      url: `${server}/product/status`,
      headers: {
        authorization: adminToken,
      },
      data: {
        id,
        status,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllPhotos = () => instance.get(`/photo`);
export const getPhoto = (id) => instance.get(`/photo/${id}`);

export const addNewPhoto = async (data) => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'POST',
      url: `${server}/photo/`,
      headers: {
        authorization: adminToken,
      },
      data,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePhoto = async (id) => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'DELETE',
      url: `${server}/photo/${id}`,
      headers: {
        authorization: adminToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsAndOnePhoto = async () => {
  try {
    const { data: products } = await getProducts();
    const { data: photos } = await getAllPhotos();

    let info = products.result.map((product) => ({
      ...photos.result.find((photo) => product.id === photo.productid),
      ...product,
    }));

    return info;
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrders = async () => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'GET',
      url: `${server}/order`,
      headers: {
        'Content-Type': 'application/json',
        authorization: adminToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrder = async (id) => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'GET',
      url: `${server}/order/${id}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: adminToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllOrders = async () => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'GET',
      url: `${server}/orderAll`,
      headers: {
        'Content-Type': 'application/json',
        authorization: adminToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAdmin = async () => {
  try {
    const adminToken = getAdminAuthToken();
    const res = await axios({
      method: 'GET',
      url: `${server}/me`,
      headers: {
        authorization: adminToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async () => {
  try {
    const token = getAuthToken();
    const res = await axios({
      method: 'GET',
      url: `${server}/me`,
      headers: {
        authorization: token,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const registerApi = async (
  username,
  password,
  realName,
  email,
  phone
) => {
  try {
    const res = await fetch(`${server}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        realName,
        email,
        phone,
      }),
    });
    return await res.json();
  } catch (error) {
    console.log('這裡是 ProductAPI 的 error = ', error);
    return;
  }
};
