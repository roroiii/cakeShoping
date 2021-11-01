import { useState, useEffect } from 'react';
// import { adminLogin } from '../../api/AdminAPI';
import { setAdminAuthToken } from '../../utils/token';
import { useRouter } from 'next/router';
import Login from '../../components/Login';
import { adminLogin } from '../../features/adminUserSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Home({ login }) {
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
  return (
    <Login
      username={username}
      values={values}
      loginErrorMessage={loginErrorMessage}
      image={`https://picsum.photos/1200`}
      userText={`管理員登入`}
      handleChangeUsername={handleChangeUsername}
      handleChangePassword={handleChangePassword}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      handleLogin={handleLogin}
    />
  );
}

// export const getStaticProps = async () => {
//   const login = await adminLogin();
//   return {
//     props: {
//       login: login || null,
//     },
//   };
// };
