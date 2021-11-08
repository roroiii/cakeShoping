import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductsTable from '../../../components/ProductsTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminUser } from '../../../features/adminUserSlice';
import {
  getProductsAndOnePhoto,
  productOnAndOffStatus,
} from '../../../pages/api/webAPI';
import NotFound from '../../../components/NotFound';

export default function Products({ productAndOnePhoto }) {
  const adminUser = useSelector(selectAdminUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = useState(productAndOnePhoto);

  const handleProductStatus = (id, status) => {
    productOnAndOffStatus(id, status);
    router.reload();
  };

  useEffect(() => {
    setProducts(products.filter((product) => product.isDeleted !== 1));
  }, []);

  return (
    <>
      {adminUser.role === 'admin' && (
        <ProductsTable
          products={products}
          handleProductStatus={handleProductStatus}
        />
      )}
      {adminUser === '' && <NotFound />}
    </>
  );
}

export const getStaticProps = async () => {
  const productAndOnePhoto = await getProductsAndOnePhoto();
  if (productAndOnePhoto) {
    return {
      props: {
        productAndOnePhoto: productAndOnePhoto,
      },
    };
  } else {
    return {
      props: {
        productAndOnePhoto: null,
      },
    };
  }
};
