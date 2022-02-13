import * as React from 'react';
import { useState }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

import { registerApi, getUser } from '../pages/api/webAPI';
import { setAuthToken } from '../utils/token';

import { useRouter } from 'next/router'

const theme = createTheme();

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [realname, setRealname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState()

  const router = useRouter()

  // 註冊按鈕
  const handleSubmit = (e) => {
    e.preventDefault();

    // 驗證的邏輯，之後外包
    const validateRegister = () => {
      if (username === '' || password === '' || realname === '' || email === '' || phone === '') {
        setErrorMessage('請輸入每個欄位喲！')
        return false
      }
      if (!checkUsername(username)) {
        setErrorMessage('帳號格式錯誤，帳號長度應為  5 ～ 20 呦！')
        return false
      }
      if (!checkPassword(password)) {
        setErrorMessage('密碼格式錯誤，密碼長度需為 8 以上並包含英文字母、數字喲！')
        return false
      }
      if (!checkEmail(email)) {
        setErrorMessage('電子信箱格式錯誤呦！')
        return false
      }
      if (!checkPhone(phone)) {
        setErrorMessage('連絡電話格式錯誤，請填寫手機號碼呦！')
        return false
      }
      console.log('看到這個代表驗證都過了')
      setErrorMessage('')
      return true
    }

    // 前端驗證沒通過就返回
    if (!validateRegister()) return

    registerApi(username, password, realname, email, phone).then(data => {
      console.log(data)
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }
      setAuthToken(data.token)
      
      // todo：這邊尚未實作 getMe()，getMe 將 JWT 傳過去驗證後拿到會員資料，存入 user state 中才算正式登入
      router.push("/")
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline /> {/* normalize.css 設定 */}
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddAlt1OutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            加入我們
          </Typography>

          { errorMessage && <Alert  sx={{ width: '100%' }} severity="error">{errorMessage}</Alert> }

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              {/* 帳號 */}
              <Grid item xs={12}>
                <TextField
                  name="username"
                  fullWidth
                  id="username"
                  label="帳號"
                  autoFocus
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete='off'
                />
              </Grid>
              {/* 密碼 */}
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="password"
                  label="密碼"
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete='off'
                />
              </Grid>
              {/* 真實姓名 */}
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  id="realname"
                  label="真實姓名"
                  name="realname"
                  value={realname}
                  onChange={e => setRealname(e.target.value)}
                  autoComplete='off'
                  inputProps={{ maxLength: 20 }}
                  />
              </Grid>
              {/* 信箱 */}
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="email"
                  label="電子信箱"
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete='off'
                />
              </Grid>
              {/* 電話 */}
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="phone"
                  label="聯絡電話"
                  type="phone"
                  id="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  autoComplete='off'
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              送出
            </Button>

            <Grid container justifyContent="flex-end">
              <Link href={`/login`} >
                <a style={{ fontSize: '1rem' }} >已有帳號？點此登入！！</a>
              </Link>
            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// 驗證的邏輯，之後外包
// 註冊資料格式判斷先丟這裡 username, password, realname, email, phone
const checkUsername = (username) => {
  // 5~20 個字元
  const regex =
  /[a-zA-Z\d]{5,20}$/
  return regex.test(username)
}

const checkPassword = (password) => {
  // 長度需為 8 以上並包含英文字母、數字
  const regex = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/
  return regex.test(password)
}

const checkEmail = (email) => {
  // 驗證 mail
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return regex.test(email)
}

const checkPhone = (phone) => {
  // 台灣 10 碼
  const rule = /^09\d{8}$/
  return rule.test(phone)
}