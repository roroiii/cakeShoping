import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Divider />
      <Grid
        container
        spacing={2}
        sx={{ pt: 3, pb: 5, bgcolor: 'primary.main', color: 'white.main' }}
      >
        <Grid item xs={2} sx={{ mx: 'auto', textAlign: 'center' }}>
          <a
            target="_blank"
            href="https://github.com/david-christian/cakeShoping"
          >
            <GitHubIcon />
          </a>
        </Grid>
        <Grid item xs={12} sx={{ mx: 'auto', textAlign: 'center' }}>
          <div>
            <Button aria-describedby={id} color="white" onClick={handleClick}>
              隱私條款
            </Button>
            ｜2021 © CAKESHOP
          </div>
          <Popover
            id={id}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {' '}
            <Typography variant="h5" sx={{ p: 2 }}>
              隱私條款
            </Typography>
            <Divider />
            <Typography sx={{ p: 2 }}>
              感謝您使用「CAKESHOP蛋糕訂購平台」，請詳閱本隱私權條款並於使用服務前確定了解本條款內容。
              <br />
              當您瀏覽或使用提供之服務，即表示您同意蒐集、使用與轉載您提供的個人資訊。
            </Typography>
          </Popover>
        </Grid>
      </Grid>
    </>
  );
}
