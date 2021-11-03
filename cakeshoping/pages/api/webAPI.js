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
      if (!window.navigator.onLine) {
        alert('網路出了點問題，請重新連線後重整網頁');
        return;
      }
      return Promise.reject(error);
    }
  );
};

export const adminLogin = (payload) => instance.post(`/admain`, payload);

export const login = (payload) => instance.post(`/login`, payload);

export const getProducts = () => instance.get(`/product`);
export const getProduct = (id) => instance.get(`/product/${id}`);

export const getAllPhotos = () => instance.get(`/photo`);
export const getPhoto = (id) => instance.get(`/photo/${id}`);

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
