import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { useCartContext } from '../context/CartContext';

import CheckoutCartItem from '../components/CheckoutCartItem';

export default function BasicTable() {
  const { cart, setCart, totalPrice } = useCartContext();
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>購物車資料</TableCell>
            </TableRow>
          </TableHead>
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
          <TableRow>
            
          <Link href={`/information`}>
            <Button
            maxWidth
              variant="outlined"
              sx={{
                p: 1,
                m: 2
              }}
            >
              前往結帳
            </Button>
          </Link>

          </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  );
}
