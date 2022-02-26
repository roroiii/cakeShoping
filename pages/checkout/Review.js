import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useCartContext } from '../../context/CartContext';

export default function Review() {
  const { cart, totalPrice, orderInfo } = useCartContext();

  const OrderListItem = ({ cartItem }) => {
    return (
      <>
        <ListItem sx={{ py: 3, px: 1 }}>
          <ListItemText primary={cartItem.productName} sx={{ width: '8%', }} />
          <ListItemText >$ {cartItem.price}</ListItemText>
          <Typography variant="body2" >{cartItem.count} 份 </Typography>
        </ListItem>
          <Divider  />
      </>
    )
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        您的訂單
      </Typography>
      <List disablePadding>
          <ListItem sx={{ py: 1, px: 0, fontSize: '10px', }}>
            <ListItemText sx={{ width: '12%', }}>商品名稱</ListItemText>
            <ListItemText>單價</ListItemText>
            <Typography variant="body2">商品數量</Typography>
          </ListItem>

        {/* 顯示訂單商品 */}
        {cart.map((cartItem) => (
          <OrderListItem key={cartItem.id} cartItem={cartItem} />
        ))}

        {/* 顯示訂單總價 */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="總價" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {totalPrice}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2} sx={{ width: 800 }}>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            收貨資訊
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>收貨人：</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{orderInfo.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>電話：</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{orderInfo.phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>電子信箱：</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{orderInfo.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>收貨地址：</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{orderInfo.address}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            付款資訊
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>付款方式：</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>信用卡</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
