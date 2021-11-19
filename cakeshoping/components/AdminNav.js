import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import BallotIcon from '@mui/icons-material/Ballot';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminUser } from '../features/adminUserSlice';
import { useRouter } from 'next/router';
import { adminLogout } from '../features/adminUserSlice';

const CakeToolbar = styled(Toolbar)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;

export default function AdminNav() {
  const adminUser = useSelector(selectAdminUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () => {
    dispatch(adminLogout());
    router.push('/');
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const MenuListItem = () => {
    return (
      <>
        <Link href={`/admin/products`}>
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
              <BallotIcon />
            </IconButton>
            <p>商品管理</p>
          </MenuItem>
        </Link>
        <Link href={`/admin/orders`}>
          <MenuItem>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AssignmentIcon />
            </IconButton>
            <p>訂單管理</p>
          </MenuItem>
        </Link>
        {/* <Link href={`/admin/members`}>
          <MenuItem>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <PermContactCalendarIcon />
            </IconButton>
            <p>會員列表</p>
          </MenuItem>
        </Link> */}
        <MenuItem onClick={handleLogout}>
          <IconButton
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
          <p>登出</p>
        </MenuItem>
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
      <MenuListItem />
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: 'secondary.main', color: 'black.main' }}
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
              CAKESHOP <span>管理員</span>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MenuListItem />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
    </Box>
  );
}
