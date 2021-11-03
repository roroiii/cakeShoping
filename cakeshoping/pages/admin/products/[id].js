import { useState } from 'react';

import ProductItem from '../../../components/ProductItem';
import Link from 'next/link';

import { getProducts, getProduct, getPhoto } from '../../../pages/api/webAPI';

export default function Product({ product, photos }) {
  return (
    <>
      <ProductItem product={product.result[0]} photos={photos.result} />
      <Link href="/">Go Back</Link>
    </>
  );
}

export const getStaticProps = async (content) => {
  const { data: product } = await getProduct(content.params.id);
  const { data: photos } = await getPhoto(content.params.id);

  return {
    props: {
      product: product,
      photos: photos,
    },
  };
};

export const getStaticPaths = async () => {
  const { data: res } = await getProducts();
  const products = res.result;

  const ids = products.map((product) => product.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
