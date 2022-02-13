import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useCartContext } from '../../context/CartContext';
import CheckoutCartItem from '../../components/CheckoutCartItem';

export default function AddressForm({orderData}) {
  const { cart, totalPrice } = useCartContext();

  return (
    <React.Fragment>
      <TableContainer>
        <Table sx={{ width: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品名稱</TableCell>
              <TableCell align="center">單價</TableCell>
              <TableCell align="center">數量</TableCell>
              <TableCell align="center">小計</TableCell>
              <TableCell align="center">刪除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
   
            {cart.map((cartItem) => (
              <CheckoutCartItem  key={cartItem.id} cartItem={cartItem} />
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        textAlign: 'right',
        fontSize: '1rem',
        margin: '20px',
      }} >
        <div>小計：NT$ {totalPrice}</div>
        <div>運費：     NT$ 0</div>
        <div>總價：NT$ {totalPrice}</div>
      </Box>
    </React.Fragment>
  );
}
