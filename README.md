# CAKESHOP

#### CAKESHOP，蛋糕很香。

↳ [專案前台連結點這](https://cake-shoping.vercel.app/)
↳ [專案管理後台連結點這](https://cake-shoping.vercel.app/admin/admin_login)

## 專案簡介

#### 線上訂蛋糕的平台，可一次將多筆商品加入購物車結帳。

我們是可以讓消費者線上訂購蛋糕的平台網站，我們致力於做出美味的糕點，征服這個世界，師傅每天匠心打造優秀的糕點，只為征服你/妳的味蕾，目的為抓住以年輕世代為主力消費的客群。
此為前端原始碼，採用 React 的 NextJS 框架開發。

## 專案目標

Clone [100 種味道](https://www.100tastes.com.tw/)部份功能的線上訂購蛋糕平台。

### 功能

- 前台功能

  - 使用者 (consumer)
    - 加入會員功能
    - 選購蛋糕後加入購物車，並可以直接結帳。
    - 查看當前訂購項目與訂單記錄

- 後台功能

  - 店家 (admin)
    - 新增、修改與刪除產品資訊
    - 查看並管理所有訂單

## 使用技術

- React NextJS
- React Hooks
- Redux Toolkit

- UI

  - Styled Component
  - MUI UI library

- API
  = JWT Token
  = axios

  - Imgur

- 程式碼
- eslint
- prettier

## 目錄結構說明

```
│── components                   // 共用元件
|   ├── AddPhoto.js
|   ├── AdminNav.js
|   ├── AlertCard.js
|   ├── AlertProductDialog.js
|   ├── CartDrawer.js
|   ├── CartDrawerList.js
|   ├── CheckoutCartItem.js
|   ├── Footer.js
|   ├── Header.js
|   ├── Layout.js
|   ├── Loading.js
|   ├── LoginComponent.js
|   ├── Meta.js
|   ├── Nav.js
|   ├── NotFound.js
|   ├── OrderItem.js
|   ├── OrderTable.js
|   ├── ProductItem.js
|   ├── ProductsTable.js
|   ├── ProjectCard.js
|   ├── Updating.js
|   └── UserNav.js
│── config                       // 區分開發與正式環境
│── context
|   └── CartContext.js
│── features
|   ├── adminUserSlice.js
|   ├── loadingSlice.js
|   └── userSlice.js
├── public                       // 靜態資源
├── pages                        // 頁面
|   ├── admin
|   |   ├── orders
|   |   |   ├── [id].js
|   |   |   ├── index.js
|   |   |   └── orders.js
|   |   ├── products
|   |   |   ├── [id].js
|   |   |   ├── add.js
|   |   |   ├── index.js
|   |   |   └── admin_login.js
|   ├── api
|   |   └── webAPI.js
|   ├── products
|   |   └── [id].js
|   ├── _app.js
|   ├── _document.js
|   ├── about.js
|   ├── cart.js
|   ├── index.js
|   ├── cart.js
|   ├── information.js
|   ├── login.js
|   └── register.js
├── redux
|   └── store.js
├── src
|   ├── hooks
|   └── theme.js
├── styles
|   └── globals.css
├── utils
|   ├── token.js
|   └── utils.js
├── .babelrc
├── .eslintrc.json
├── .prettierrc.json
├── .babel.config.json
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

## 版本

目前版本 v1

## 如何本地端執行

0. 本地端要有 node.js、Git、SQL 環境
1. 在此頁面下載壓縮檔或 clone 到本地（連同[後端](https://github.com/david-christian/cakeshoping_server/tree/main)專案）
2. `npm install` 安裝專案所需套件
3. `npm start` 執行專案（連同後端專案一併操作）
   以下提供測試用的帳號密碼：

| Name     | 帳號   | password  | 權限     |
| -------- | ------ | --------- | -------- |
| 管理者   | gunail | 111111    | 最高權限 |
| 測試帳號 | test1  | a12345678 | 使用者   |

- 為了良好測試體驗，請使用功能時斟酌增減測試

## 專案展示

###### 首頁

![](https://i.imgur.com/52M25GY.png)

###### 加入購物車

![](https://i.imgur.com/E5DLj6d.png)

###### 購物車結帳

![](https://i.imgur.com/tUBUFT6.png)

###### 加入會員

![](https://i.imgur.com/CCKBHky.png)

###### 會員登入

![](https://i.imgur.com/ULNaJmv.png)

###### [店家] 管理後台

![](https://i.imgur.com/OXJPdRQ.png)

###### [店家] 管理訂單

![](https://i.imgur.com/WSdxWNd.png)

###### [店家] 查看詳細訂單

![](https://i.imgur.com/CUnKdPq.png)

###### [店家] 新增商品

![](https://i.imgur.com/g6tGiC3.png)

###### [店家] 編輯商品

![](https://i.imgur.com/RMj5MCN.png)

## 專案後端

訂購蛋糕平台後端，使用 nodejs Express 框架 及 MySQL 關聯式資料庫進行開發。

↳ [後端專案連結點這](https://github.com/david-christian/cakeshoping_server/tree/main)
