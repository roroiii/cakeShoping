import { createContext, useContext, useState, useRef, useMemo, useEffect  } from 'react';
import { addCartToLocalStorage, getCartFromLocalStorage } from '../utils/utils'

const CartContext = createContext(null);

export function AppWrapper({ children }) {
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  const cartId = useRef(1)
  // const [paymentInfo, setPaymentInfo] = useState(
  //   {
  //     "totalPrice": 0,
  //     "name": "", 
  //     "phone": "", 
  //     "address": "", 
  //     "email": "", 
  //     "productList": []
  //   }
  // )
  
  // 每次重整從 local 拿 cart 資料，將 cartId 數量更新到正確
  useEffect(() => {
    console.log('重整 in context')
    setCart(JSON.parse(getCartFromLocalStorage()) || [])
    
    const local = JSON.parse(getCartFromLocalStorage())
    if (!local) {
      cartId.current = 1
    } else {
      let localLength = local.length
      cartId.current = local[localLength-1].id + 1
    }
  }, [])
  
  // 總價
  useEffect(() => {
    let total = 0
    cart.forEach(cartItem => {
      total += cartItem.count * cartItem.price
    })
    setTotalPrice(total)
  }, [cart])

  // const contextValue = useMemo(() => {
  //   return [cart, setCart];
  // }, [cart, setCart]);
  
  // 商品加到購物車
  const handleAddToCart = (productInfo, count) => {
    const { productid, productName, price, url }  = productInfo
    const OriginCart = cart
    let NewCart
    const AlreadyInCart = OriginCart.every((cartItem) => cartItem.productid !== productid)

    if (AlreadyInCart) {
      // 沒有重複的商品，直接加到屁屁
      NewCart = [
        ...cart,
        {
          id: cartId.current,
          productid,
          productName,
          price,
          url,
          count
        }
      ]
      cartId.current++
    } else {
      // 重複的商品，用 map 做一個新的 Cart，更改數量，直接改 cart state
      NewCart = OriginCart.map((cartItem) => {
        if (cartItem.productid !== productid) return cartItem
        return {
          ...cartItem,
          count: cartItem.count + count
        }
      })
    }
    setCart(NewCart)
    addCartToLocalStorage(NewCart)
    // 將加入購物車的邏輯都放進來
    // 這邊會做到的事情：點擊按鈕之後
    // 將 cart state 改變 & 將 localStorage 改變
    
    // 要注意的事情，加入前，先檢查是否有加入過，用 product id 去檢查
    // 每次回到頁面前，將 localStorage 的資料先放進 cart state 裡面，可以放在 function 裡面，每次加入就先執行
  }
  
  // 從購物車中移除
  const handleRemoveFromCart = (CartId) => {
    // 一定是在購物車裡面。所以用 filter 吧
    // 做完要改變 cart state 以及 localStorage 
    const OriginCart = cart
    let NewCart = OriginCart.filter((cartItem) => cartItem.id !== CartId)

    setCart(NewCart)
    addCartToLocalStorage(NewCart)
  }

  // 結帳購物車用，改變購物車數量
  const handleChangeCountFromCart = (cartId, newCount) => {
    // 更改購物車，傳入要改的 ID 、新的數量，
    // 結果 改變 cart state 以及 local
    const OriginCart = cart 
    let NewCart = OriginCart.map((cartItem) => {
      if (cartItem.id !== cartId) return cartItem
      return {
        ...cartItem,
        count: newCount
      }
    })
    
    setCart(NewCart)
    addCartToLocalStorage(NewCart)
  }

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        setCart, 
        cartId, 
        handleAddToCart,
        handleRemoveFromCart,
        totalPrice, 
        setTotalPrice,
        handleChangeCountFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
