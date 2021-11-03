import { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ProjectCard from '../components/ProjectCard';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { getProductsAndOnePhoto } from '../pages/api/webAPI';

export default function Home({ productAndOnePhoto }) {
  return (
    <div>
      <Meta />
      <Box sx={{ display: 'flex' }}>
        <Card sx={{ maxWidth: 1200, height: 350 }}>
          <CardMedia
            component="img"
            height="auto"
            image="https://picsum.photos/1200"
            alt="green iguana"
          />
        </Card>
      </Box>
      <Typography
        variant="body"
        color="text.secondary"
        sx={{ display: 'block', pt: 2 }}
      >
        本月甜點
      </Typography>
      <Divider sx={{ pt: 1, mb: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: { xs: 'wrap', md: 'wrap', lg: 'wrap' },
          justifyContent: 'space-around',
          marginLeft: '-16px',
          marginRight: '-16px',
        }}
      >
        {productAndOnePhoto.map((cake) => (
          <ProjectCard key={cake.id} cake={cake} />
        ))}
      </Box>
    </div>
  );
}

export const getStaticProps = async () => {
  const productAndOnePhoto = await getProductsAndOnePhoto();
  return {
    props: {
      productAndOnePhoto,
    },
  };
};
