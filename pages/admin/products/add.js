import { useState } from 'react';
import ProductItem from '../../../components/ProductItem';
import {
  getProducts,
  getProduct,
  getPhoto,
  deletePhoto,
  deleteProduct,
  updateProduct,
  addProduct,
} from '../../api/webAPI';
import { server } from '../../../config';
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [type, setType] = useState(1);
  const [price, setPrice] = useState(0);
  const [articlel, setArticlel] = useState('');
  const [isShow, setIsShow] = useState(true);
  const [storage, setStorage] = useState(0);
  const [sell, setSell] = useState(0);
  const [photos, setPhotos] = useState('');

  const handleAddProduct = async (data, id) => {
    addProduct(data).then((res) => {
      console.log(res);
    });
    if(id) router.push(`/admin/products/${id}`);
    router.push('/admin/products');
  };
  const handleDeletePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
    deletePhoto(id);
  };
  const handleIsShowClick = (e) => {
    setIsShow(e.target.checked);
  };

  return (
    <>
      <ProductItem
        title={`新增商品`}
        photos={photos}
        productName={productName}
        type={type}
        price={price}
        articlel={articlel}
        isShow={isShow}
        storage={storage}
        sell={sell}
        setProductName={setProductName}
        setType={setType}
        setPrice={setPrice}
        setArticlel={setArticlel}
        setStorage={setStorage}
        setSell={setSell}
        handleAddProduct={handleAddProduct}
        handleDeletePhoto={handleDeletePhoto}
        handleIsShowClick={handleIsShowClick}
      />
    </>
  );
}
