import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { useCartContext } from '../context/CartContext'

export default function CartDrawerList({ cartItem }) {
  const { productName, price, url, count } = cartItem
  const { handleRemoveFromCart } = useCartContext();

  const handleClick = () => {
    handleRemoveFromCart(cartItem.id)
  }

  return (
    <List>
      <ListItem 
        sx={{
          mb: '10px'
        }}
        alignItems="flex-start">

        <ListItemAvatar>
          <Avatar sx={{ width: 70, height: 70, mr: '30px' }} src={url} variant="square" />
        </ListItemAvatar>

        <ListItemText
          sx={{
            height: '70px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          primary={
            <Typography
              sx={{ fontSize: '18px' }}
              component="div"
            >
              {productName}
            </Typography>
          }
          secondary={
            <Typography
              sx={{ fontSize: '14px' }}
              component="div"
              variant="body2"
              color="text.primary"
            >
              {count} × NT${price}
            </Typography>
          }
        />

        <IconButton onClick={handleClick}>
          <DeleteIcon sx={{ width: 25, height: 25 }} variant="square" />
        </IconButton>

      </ListItem>
      <Divider />
    </List>
  );
}
