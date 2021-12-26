import { useState, useEffect } from 'react';
import useSWR from "swr";
import { useRouter } from 'next/router';
import ProductsTable from '../../../components/ProductsTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminUser } from '../../../features/adminUserSlice';
import {
  getProductsAndOnePhoto,
  productOnAndOffStatus,
} from '../../../pages/api/webAPI';
import NotFound from '../../../components/NotFound';
import {server} from "../../../config/index"

const fetcher = (url) =>
  fetch(`${server}${url}`).then((res) => res.json());



export default function Products({ productAndOnePhoto }) {
  const adminUser = useSelector(selectAdminUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const handleProductStatus = (id, status) => {
    productOnAndOffStatus(id, status);
    router.reload();
  };

  // const { data: productsA } = useSWR("/product", fetcher);
  // const { data: photoA } = useSWR("/photo", fetcher);
  // if (!productsA && !photoA) return <div>loading</div>;
  // console.log(productsA.result)
  // console.log(photoA)

  const { data: productsA } = useSWR("/product", fetcher);
  const { data: photoA } = useSWR("/photo", fetcher);
  if (!productsA && !photoA) return <div>loading</div>;

  const getProductsAndOnePhoto =  () => {
    try {


      let info = productsA.result.map((product) => ({
        ...photoA.result.find((photo) => product.id === photo.productid),
        ...product,
      }));
      let infoNotDelete = info.filter((product) => product.isDeleted !== 1);
  
      return infoNotDelete;
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(getProductsAndOnePhoto())

// console.log(getProductsAndOnePhoto())

const aaa = getProductsAndOnePhoto()

  // useEffect(() => {
  //   setProducts(products.filter((product) => product.isDeleted !== 1));
  // }, []);

  return (
    <>
      {aaa && photoA && productsA && adminUser.role === 'admin' ? (
        <ProductsTable
          products={aaa}
          handleProductStatus={handleProductStatus}
        />
      ) : (
        <NotFound />
      )}
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
      revalidate: 1,
    };
  } else {
    return {
      props: {
        productAndOnePhoto: null,
      },
    };
  }
};
