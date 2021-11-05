import { useState } from 'react';
import ProductItem from '../../../components/ProductItem';
import { getProducts, getProduct, getPhoto } from '../../../pages/api/webAPI';
import { server } from '../../../config';

export default function Product({ product, photos }) {
  return (
    <>
      <ProductItem product={product} photos={photos} />
    </>
  );
}

export const getStaticProps = async (content) => {
  const { data: product } = await getProduct(content.params.id);
  const { data: photos } = await getPhoto(content.params.id);

  return {
    props: {
      product: product.result[0],
      photos: photos.result,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/product`);
  const products = await res.json();

  const paths = products.result.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};
