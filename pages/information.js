import * as React from 'react';
import { useState, useEffect }  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import { useCartContext } from '../context/CartContext';

import CheckoutCartItem from '../components/CheckoutCartItem';

export default function BasicTable() {
  const { cart, setCart, totalPrice } = useCartContext();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [realname, setRealname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [address, setAddress] = useState('')

  const handleSubmit = () => {
    console.log('123')
  }
  return (
    <>

      <Container component="main" maxWidth="md" 
        sx={{
        }}>
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >

          <Typography >
            寄送資訊
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

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
              {/* 地址 */}
              <Grid item xs={12}>
                 <TextField
                  fullWidth
                  name="address"
                  label="地址"
                  id="address"
                  value={phone}
                  onChange={e => setAddress(e.target.value)}
                  autoComplete='off'
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
          </Box>
        </Box>

        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography >
            您的訂單：
          </Typography>

          <TableContainer component={Paper}        
            sx={{
              display: 'flex', 
              mt: 3
            }}
          >

            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>商品名稱</TableCell>
                  <TableCell align="center">單價</TableCell>
                  <TableCell align="center">數量</TableCell>
                  <TableCell align="center">小計</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((cartItem) => (
                  <CheckoutCartItem  key={cartItem.id} cartItem={cartItem} fixCount={true} />
                ))}


              <TableRow>
                <TableCell rowSpan={5} />
                <TableCell colSpan={2}></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>小計</TableCell>
                <TableCell align="center">NT$ {totalPrice}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>運費</TableCell>
                <TableCell align="center">NT$ 0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>總價</TableCell>
                <TableCell align="center">NT$ {totalPrice}</TableCell>
              </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      
    </>
  );
}
