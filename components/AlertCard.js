import * as React from 'react';
import { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

// 計數器
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';

import { useCartContext } from '../context/CartContext'

export default function AlertCard({ cake, handleClose }) {
  const theme = useTheme();
  const [count, setCount] = useState(1)
  const { handleAddToCart } = useCartContext();
  function handleClick() {
    console.log('新增到購物車，按鈕在 AlertCard')
    handleAddToCart(cake, count)
    handleClose()
  }

  return (
    <Card 
      sx={{ 
        display: 'flex',
        borderRadius: 0,
        boxShadow: 0,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 350, height: 350 }}
        image={cake.url}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 250 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {cake.productName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            NT {cake.price}
          </Typography>
        </CardContent>

        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center',pl: 1, pb: 1 }}>
          數量
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 1));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Badge color="secondary">
            {count}
          </Badge>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(Math.max(count + 1, 0));
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center',pl: 1, pb: 1 }}>
          <Button onClick={ handleClick }>加到購物車</Button>
          <Button onClick={() => console.log('直接購買')}>直接購買</Button>
        </Box>
      </Box>
    </Card>
  );
}
