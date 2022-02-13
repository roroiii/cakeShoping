import { Fragment, useState, useEffect, useContext, createContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Link from 'next/link';


// 這邊要顯示購物車的數量
// 思路：
// 引入 context 全域的 cart state
// 計算數量
// 新增 count state
// 直接 useEffect => cart 改變時就改變 count 
import CartDrawerList from '../components/CartDrawerList'
// Context 
import { useCartContext } from '../context/CartContext';

export default function CartDrawer() {
  // 購物車 state
  const { cart, setCart } = useCartContext();
  
  const [count, setCount] = useState(0)
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // Nav 購物車的數量
  useEffect(() => {
    let total = 0
    cart.forEach(element  => {
      total += element.count
    })
    setCount(total)
  }, [cart])

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        textAlign: 'center',
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {cart.map((cartItem) => (
          <CartDrawerList key={cartItem.id} cartItem={cartItem} />
        ))}
      </List>
      {/* 可以放總金額組件 */}
      <Link href={`/checkout`}>
        <Button
          variant="outlined"
          sx={{
            mx: 'auto',
            width: 300,
            p: 1,
            m: 2,
            borderRadius: 1,
          }}
        >
          訂單結帳
        </Button>
      </Link>
    </Box>
  );

  return (
    <>
      <MenuItem
        onClick={toggleDrawer('left', true)}
        color="white"
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <IconButton
          size="small"
          edge="end"
          aria-label="shop cart"
          aria-haspopup="true"
          color="inherit"
        >
          <Badge badgeContent={count} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem
        onClick={toggleDrawer('left', true)}
        color="white"
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        <IconButton
          size="small"
          edge="end"
          aria-label="shop cart"
          aria-haspopup="true"
          color="inherit"
        >
          <Badge badgeContent={count} color="error" sx={{ fontSize: '16px'}}>
            <ShoppingCartOutlinedIcon />
            <p>購物車</p>
            {/* 可以把他移下去 */}
          </Badge>
        </IconButton>
      </MenuItem>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </>
  );
}
