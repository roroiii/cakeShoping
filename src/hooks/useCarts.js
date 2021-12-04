import  { useState, useEffect, useRef } from 'react';

// 加到 localStorage
function writeToLocalStorage(product) {
  window.localStorage.setItem("carts", JSON.stringify(product))
}

export default function useCarts () {
  const [cart, setCart] = useState([])
  const cartId = useRef(1)

  // # 加入購物車
  const handleAddToCart = (productId, name, price, count) => {
    // 將點擊到的商品及數量加入購物車中
    if (!productId) {
      console.log('cart 哪邊錯了，沒有 id 耶')
      return
    }
    
    
    setCart([
      ...cart,
      {
      id: cartId.current,
      productId: productId,
      productName: name,
      price: price,
      productCount: count
    }])

    useEffect(() => {
      writeToLocalStorage(cart)
    }, [cart])

    cartId.current++  // id++

    
    // const product = {
    //   id: cartId.current,
    //   productId: productId,
    //   productName: name,
    //   unitPrice: price,
    //   productCount: count
    // }
    
    // // 1. 將 localStorage 中的資料先撈出來 => productData
    // const productData = window.localStorage.getItem("carts") || ""
    // // 2. productData + 現在資料 => 存入 localSto
    // if (productData) {
    //   console.log(productData)
    //   window.localStorage.setItem("carts", [
    //     ...productData,  
    //     {
    //       id: cartId.current,
    //       productId: productId,
    //       productName: name,
    //       unitPrice: price,
    //       productCount: count
    //     }
    //   ])
    // } else {
    //   writeToLocalStorage(product)
    // }
  }


  return {
    cart,
    setCart,
    cartId,
    
    handleAddToCart,
  }
}