import { Fragment, useState } from 'react';
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

export default function CartDrawer() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
        {['商品一', '商品二', '蛋糕一', '蛋糕二'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button
        href={'/cart'}
        variant="outlined"
        sx={{
          mx: 'auto',
          width: 200,
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
      >
        訂單結帳
      </Button>
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
          <Badge badgeContent={17} color="error">
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
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <p>購物車</p>
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
