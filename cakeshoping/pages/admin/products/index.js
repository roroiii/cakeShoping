import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductsTable from '../../../components/ProductsTable';
import { adminLogin } from '../../../features/adminUserSlice';
import { useDispatch } from 'react-redux';

import { getProductsAndOnePhoto } from '../../../pages/api/webAPI';

export default function Products({ productAndOnePhoto }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  const handleChangeUsername = (e) => {
    setLoginErrorMessage(null);
    setUsername(e.target.value);
  };

  const handleChangePassword = (prop) => (e) => {
    setLoginErrorMessage(null);
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginErrorMessage(null);
    const payload = {
      username,
      password: values.password,
    };
    dispatch(adminLogin(router, payload)).then((res) => {
      if (username === '' || values.password === '') {
        return setLoginErrorMessage(`請輸入帳號密碼`);
      }

      if (res.data.ok === 0) {
        return setLoginErrorMessage(res.data.message);
      }
    });
  };
  return <ProductsTable productAndOnePhoto={productAndOnePhoto} />;
}

export const getStaticProps = async () => {
  const productAndOnePhoto = await getProductsAndOnePhoto();
  return {
    props: {
      productAndOnePhoto,
    },
  };
};
