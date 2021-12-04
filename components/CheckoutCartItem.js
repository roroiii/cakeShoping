import * as React from 'react';
import { useState, useEffect }  from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCartContext } from '../context/CartContext';

export default function CheckoutCartItem({ cartItem, fixCount }) {
  const { handleRemoveFromCart, handleChangeCountFromCart } = useCartContext();
  const [quantity, setQuantity] = useState(cartItem.count)

  const handleDelete = () => {
    console.log(cartItem.id)
    handleRemoveFromCart(cartItem.id)
  }

  const handleCount = (type) => {
    if (type === 'minus') {
      setQuantity(Math.max(quantity - 1, 1));
    }

    if (type === 'plus') {
      setQuantity(Math.max(quantity + 1, 0));
    }
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
          <ButtonGroup
            sx={{ 
            }}>
            <Button
              sx={{ 
                width: '40px'
              }}
              onClick={() => {
                handleCount('minus')
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button
              sx={{ 
                width: '60px'
              }}>
              {quantity}
            </Button>
            <Button
              sx={{ 
                width: '40px'
              }}
              onClick={() => {
                handleCount('plus')
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
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
