import { useState, useEffect } from 'react';
import OrderItem from '../../../components/OrderItem';
import {
  getProducts,
  getProduct,
  getPhoto,
  deletePhoto,
  deleteProduct,
  updateProduct,
  addNewPhoto,
  getOrders,
  getOrder,
} from '../../api/webAPI';
import { server } from '../../../config';
import { useRouter } from 'next/router';

export default function Order({}) {
  const router = useRouter();
  const [order, setOrders] = useState('');

  const getOrderUUID = async (id) => {
    const res = await getOrders();
    const data = await res.data.result;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id.toString() === id) {
        await getOrderInfo(data[i].orderid.toString());
      }
    }
  };

  const getOrderInfo = async (uuid) => {
    const res = await getOrder(uuid);
    const data = await res.data.result;
    setOrders(data);
  };
  useEffect(() => {
    const url = location.href.split('/')[5];
    getOrderUUID(url);
  }, []);

  return (
    <>
      <OrderItem title={`訂單詳情`} order={order} />
    </>
  );
}

// export const getStaticProps = async (content) => {
//   const { data: orderData } = await getOrder(content.params.id);

//   return {
//     props: {
//       orderData: orderData.result[0],
//       photosData: photosData.result,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await getOrders();
//   const ordersData = await res.data.result;

//   // const orders = await res.json();

//   const paths = ordersData.map((post) => ({
//     params: { id: post.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
