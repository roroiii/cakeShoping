import * as React from 'react';
import { useState, useEffect }  from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCartContext } from '../context/CartContext';

import Counter from './Counter';

export default function CheckoutCartItem({ cartItem, fixCount }) {
  const { handleRemoveFromCart, handleChangeCountFromCart } = useCartContext();
  const [quantity, setQuantity] = useState(cartItem.count)

  const handleDelete = () => {
    console.log(cartItem.id)
    handleRemoveFromCart(cartItem.id)
  }

  useEffect(() => {
    handleChangeCountFromCart(cartItem.id, quantity)
  }, [quantity])

  return (
    <TableRow
      key={cartItem.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >

      {/* 名稱 */}
      <TableCell component="th" scope="row">
        {cartItem.productName}
      </TableCell>

      {/* 單價 */}
      <TableCell align="center">NT$ {cartItem.price}</TableCell>
      
      {/* 數量 */}
      { fixCount && <TableCell align="center">{cartItem.count}</TableCell> }
      { !fixCount && 
        <TableCell align="center">
          <Counter quantity={quantity} setQuantity={setQuantity} />
        </TableCell>
      }

      {/* 小計 */}
      <TableCell align="center">NT$ {cartItem.price * cartItem.count}</TableCell>
      
      {/* 刪除 */}
      { !fixCount && 
        <TableCell align="center">
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{ width: 25, height: 25 }} variant="square" />
          </IconButton>
        </TableCell>
      } 
    </TableRow>
  );
}
