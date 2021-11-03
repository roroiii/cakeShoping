import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductsTable from '../../../components/ProductsTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminUser } from '../../../features/adminUserSlice';
import { getProductsAndOnePhoto } from '../../../pages/api/webAPI';
import NotFound from '../../../components/NotFound';

export default function Products({ productAndOnePhoto }) {
  const adminUser = useSelector(selectAdminUser);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      {adminUser.role === 'admin' && (
        <ProductsTable productAndOnePhoto={productAndOnePhoto} />
      )}
      {adminUser === '' && <NotFound />}
    </>
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
