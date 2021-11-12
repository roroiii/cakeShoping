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
  const [fileSrc, setFileSrc] = useState(null);
  const [photoSrc, setPhotoSrc] = useState(null);

  const handleUploadFile = async (e) => {
    const _file = e.target.files[0];
    let uploadedFiles = event.target.files;
    let files = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      files.push(uploadedFiles[i]);
    }
    if (!_file) return;
    setPhotoSrc([_file]);
    let reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader.readAsDataURL(_file);
    e.target.value = '';
  };
  const handleClearFile = (e) => {
    e.preventDefault();
    setFileSrc(null);
  };

  const handleUpdateProduct = async (data) => {
    updateProduct(data);
    router.reload();
  };

  const handleAddPhoto = async () => {
    let formData = [];
    formData.push({ image: fileSrc });
    const data = {
      avatar: [{ image: fileSrc }],
      productId: id.toString(),
    };
    addNewPhoto(data);
    console.log(data);
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
        fileSrc={fileSrc}
        photoSrc={photoSrc}
        handleAddPhoto={handleAddPhoto}
        handleUploadFile={handleUploadFile}
        handleClearFile={handleClearFile}
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
