import { useState } from 'react';
import ProductItem from '../../../components/ProductItem';
import {
  getProducts,
  getProduct,
  getPhoto,
  deletePhoto,
  deleteProduct,
  updateProduct,
  addNewPhoto,
} from '../../../pages/api/webAPI';
import { server } from '../../../config';
import { useRouter } from 'next/router';

export default function Product({ productData, photosData }) {
  const router = useRouter();
  const [productName, setProductName] = useState(productData.productName);
  const [type, setType] = useState(productData.type);
  const [price, setPrice] = useState(productData.price);
  const [articlel, setArticlel] = useState(productData.articlel);
  const [isShow, setIsShow] = useState(productData.isShow ? true : false);
  const [storage, setStorage] = useState(productData.storage);
  const [sell, setSell] = useState(productData.sell);
  const [id, setID] = useState(productData.id);
  const [isDeleted, setIsDeleted] = useState(productData.isDeleted);
  const [photos, setPhotos] = useState(photosData);
  const [photoSrc, setPhotoSrc] = useState([]);

  const handleUploadFile = async (e) => {
    let fromData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      fromData.append('avatar', e.target.files[i]);
      fromData.append('productid', id);
    }
    await addNewPhoto(fromData).catch((error) => console.log(error));
    console.log(fromData);
  };

  const handleUpdateProduct = async (data) => {
    updateProduct(data);
    router.reload();
  };

  const handleDeletePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
    deletePhoto(id);
  };
  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    router.push('/admin/products');
  };
  const handleIsShowClick = (e) => {
    setIsShow(e.target.checked);
  };

  return (
    <>
      <ProductItem
        title={`編輯商品 ID:`}
        photos={photos}
        productName={productName}
        type={type}
        price={price}
        articlel={articlel}
        isShow={isShow}
        storage={storage}
        sell={sell}
        id={id}
        setProductName={setProductName}
        setType={setType}
        setPrice={setPrice}
        setArticlel={setArticlel}
        setStorage={setStorage}
        setSell={setSell}
        isDeleted={isDeleted}
        handleUpdateProduct={handleUpdateProduct}
        handleDeletePhoto={handleDeletePhoto}
        handleDeleteProduct={handleDeleteProduct}
        handleIsShowClick={handleIsShowClick}
        photoSrc={photoSrc}
        handleUploadFile={handleUploadFile}
      />
    </>
  );
}

export const getStaticProps = async (content) => {
  const { data: productData } = await getProduct(content.params.id);
  const { data: photosData } = await getPhoto(content.params.id);

  return {
    props: {
      productData: productData.result[0],
      photosData: photosData.result,
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
