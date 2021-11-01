import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CartDrawer from './CartDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminUser, adminLogout } from '../features/adminUserSlice';
import { useRouter } from 'next/router';

const CakeToolbar = styled(Toolbar)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

export default function Nav() {
  const adminUser = useSelector(selectAdminUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  console.log(adminUser);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>登出</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const MenuListItem = () => {
    return (
      <>
        <Link href={`/about`}>
          <MenuItem>
            <IconButton
              size="small"
              edge="end"
              aria-label="about"
              color="inherit"
            >
              <BakeryDiningOutlinedIcon />
            </IconButton>
            <p>關於我們</p>
          </MenuItem>
        </Link>
        {!adminUser && (
          <Link href={`/register`}>
            <MenuItem>
              <IconButton
                size="small"
                edge="end"
                aria-label="register"
                color="inherit"
              >
                <PersonAddAlt1OutlinedIcon />
              </IconButton>
              <p>加入會員</p>
            </MenuItem>
          </Link>
        )}
        <Link href={`/member`}>
          <MenuItem>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>
            <p>會員中心</p>
          </MenuItem>
        </Link>
        <CartDrawer />
      </>
    );
  };
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link href={`/about`}>
        <MenuItem href={`/about`}>
          <IconButton
            size="small"
            edge="end"
            aria-label="about"
            color="inherit"
          >
            <BakeryDiningOutlinedIcon />
          </IconButton>
          <p>關於我們</p>
        </MenuItem>
      </Link>
      {!adminUser && (
        <Link href={`/register`}>
          <MenuItem>
            <IconButton
              size="small"
              edge="end"
              aria-label="register"
              color="inherit"
            >
              <PersonAddAlt1OutlinedIcon />
            </IconButton>
            <p>加入會員</p>
          </MenuItem>
        </Link>
      )}
      <Link href={`/member`}>
        <MenuItem>
          <IconButton
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <p>會員中心</p>
        </MenuItem>
      </Link>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: 'white.main', color: 'black.main' }}
      >
        <CakeToolbar>
          <Link href={`/`}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { sm: 'block' },
                cursor: 'pointer',
                padding: '6px 16px',
              }}
            >
              CAKESHOP
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MenuListItem />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="small"
              edge="end"
              aria-label="shop cart"
              color="inherit"
            ></IconButton>
            <CartDrawer />
            <IconButton
              size="large"
              aria-label="open drawer"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </CakeToolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </Box>
  );
}
