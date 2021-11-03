import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginComponent from '../components/LoginComponent';
import { userLogin } from '../features/userSlice';
import { useDispatch } from 'react-redux';

export default function LoginPage() {
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
    dispatch(userLogin(router, payload)).then((res) => {
      if (username === '' || values.password === '') {
        return setLoginErrorMessage(`請輸入帳號密碼`);
      }

      if (res.data.ok === 0) {
        return setLoginErrorMessage(res.data.message);
      }
    });
  };
  return (
    <LoginComponent
      username={username}
      values={values}
      loginErrorMessage={loginErrorMessage}
      image={`https://picsum.photos/1200`}
      userText={`會員登入`}
      handleChangeUsername={handleChangeUsername}
      handleChangePassword={handleChangePassword}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      handleLogin={handleLogin}
    />
  );
}
