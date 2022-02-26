const CART_NAME = 'cart'
const CHECKOUT_NAME = 'checkout'

// 將 product 加入 localStorage
export const addCartToLocalStorage = (productItems) => {
  localStorage.setItem(CART_NAME, JSON.stringify(productItems))
}

// 從 localStorage 拿出 cart
export const getCartFromLocalStorage = () => {
  return localStorage.getItem(CART_NAME)
}

export const addCheckoutDataToLocalStorage = (checkoutData) => {
  localStorage.setItem(CHECKOUT_NAME, JSON.stringify(checkoutData))
}

export const getCheckoutDataFromLocalStorage = () => {
  return localStorage.getItem(CHECKOUT_NAME)
}
// const localCart = JSON.parse(getItemsFromLocalStorage())
// let isProductInCart = localCart
//   ? localCart.filter((item) => item.id === parseInt(id))
//   : []
  // parseInt() 將字串轉換為以十進位表示的整數。parseInt() 接受兩個參數。

export const getTotalPrice = (cart) => {
  let total = 0
  cart.forEach(cartItem => {
    total += cartItem.count * cartItem.price
  })
  return total
}
