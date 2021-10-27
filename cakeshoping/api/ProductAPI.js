import { server } from '../config';

export const getProducts = async () => {
  try {
    const res = await fetch(`${server}/product`);
    const product = await res.json();

    if (product.ok === 1) {
      return product;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getPhotos = async () => {
  try {
    const res = await fetch(`${server}/photo`);
    const photo = await res.json();

    if (photo.ok === 1) {
      return photo;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsAndOnePhoto = async () => {
  try {
    const products = await getProducts();
    const photos = await getPhotos();

    let info = products.result.map((product) => ({
      ...photos.result.find((photo) => product.id === photo.productid),
      ...product,
    }));

    return info;
  } catch (error) {
    console.log(error.message);
  }
};
