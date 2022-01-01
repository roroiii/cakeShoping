import useSWR from "swr";
import { useRouter } from 'next/router';
import ProductsTable from '../../../components/ProductsTable';
import { useSelector } from 'react-redux';
import { selectAdminUser } from '../../../features/adminUserSlice';
import { productOnAndOffStatus } from '../../../pages/api/webAPI';
import NotFound from '../../../components/NotFound';
import { server } from "../../../config/index"

const fetcher = (url) =>
  fetch(`${server}${url}`).then((res) => res.json());

export default function Products() {
  const adminUser = useSelector(selectAdminUser);
  const router = useRouter();

  const handleProductStatus = (id, status) => {
    productOnAndOffStatus(id, status);
    router.reload();
  };

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

const aaa = getProductsAndOnePhoto()

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

// export const getStaticProps = async () => {
//   const productAndOnePhoto = await getProductsAndOnePhoto();
//   if (productAndOnePhoto) {
//     return {
//       props: {
//         productAndOnePhoto: productAndOnePhoto,
//       },
//       revalidate: 1,
//     };
//   } else {
//     return {
//       props: {
//         productAndOnePhoto: null,
//       },
//     };
//   }
// };
