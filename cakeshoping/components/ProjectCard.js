import * as React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const CakeCard = styled(Card)`
  height: unset;
  min-height: unset;
  min-height: 100px;
`;

export default function ProjectCard({ cake }) {
  const isShow = cake.isShow;

  return (
    <>
      {isShow === 1 && (
        <Card
          sx={{
            maxWidth: { xs: '100%', sm: '50%', md: 'auto', lg: 300 },
            borderRadius: 0,
            boxShadow: 0,
            mb: 5,
            p: 2,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={cake.url || 'https://i.imgur.com/fQPBsoF.jpeg'}
              alt="green iguana"
              sx={{ height: { xs: 150, sm: 380, md: 450 } }}
            />
            <CardContent
              sx={{
                height: 'unset',
                minHeight: 100,
              }}
            >
              <Typography
                gutterBottom
                variant="body"
                component="div"
                sx={{ textAlign: 'center' }}
              >
                {cake.productName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center' }}
              >
                {`NT$${cake.price}`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ p: 0 }}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                mx: 'auto',
                width: '100%',
                height: '32px',
                p: 1,
                m: 0,
                borderRadius: 1,
              }}
            >
              <ShoppingCartOutlinedIcon />
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}
