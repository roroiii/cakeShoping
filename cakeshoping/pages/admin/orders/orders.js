import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OrderTable from '../../../components/OrderTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminUser } from '../../../features/adminUserSlice';
import { getOrders, getOrder } from '../../api/webAPI';
import NotFound from '../../../components/NotFound';

export default function Products() {
  const adminUser = useSelector(selectAdminUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});

  const getOrdersData = async () => {
    const res = await getOrders();
    const ordersData = await res.data.result;
    setOrders(ordersData);
  };

  const getOrderData = async () => {
    const res = await getOrder();
    const orderData = await res.data.result;
    setOrders(orderData);
  };

  useEffect(() => {
    getOrdersData();
  }, []);
  return (
    <>
      {adminUser.role === 'admin' ? (
        <OrderTable orders={orders} />
      ) : (
        <NotFound />
      )}
    </>
  );
}
