const { reject } = require("bcrypt/promises");
const { resolve } = require("path");
const orderModel = require("../models/order");
const { v4: uuidv4 } = require("uuid");
const ERROR_CODE = {
  INVALID: 1, // 无效的
  UNAUTHORIZED: 2, // 未经授权
  DUPLICATED: 3, // 重复
};

const makeError = (code, message) => ({
  code,
  message,
  ok: 0,
});

const orderControllers = {
  // 拿到該頁訂單
  getPage: (req, res) => {
    try {
      const { page, limit } = req.query;
      const startId = (Number(page) - 1) * Number(limit) + 1;
      const endId = startId + Number(limit);
      orderModel.getPage(startId, endId, (err, result) => {
        if (err) {
          console.log(`getPage error：${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "取得該頁訂單失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, result: result[0] });
      });
    } catch (error) {
      console.log("ctl order getPage catchERROR :", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl order getPage catchERROR：${error}`,
      });
    }
  },
  // 獲取訂單總筆數
  getAll: (req, res) => {
    try {
      orderModel.getAll((err, count) => {
        if (err) {
          console.log(`getAll error：${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "取得訂單總筆數失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, count });
      });
    } catch (error) {
      console.log("ctl order getAll catchERROR :", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl order getAll catchERROR：${error}`,
      });
    }
  },
  // 拿取該會員全部訂單
  getUserAll: (req, res) => {
    try {
      const { userId } = req.query;
      orderModel.getUserAll(userId, (err, result) => {
        if (err) {
          console.log(`getUserAll error：${err.toString()}`);
          res.status(403);
          return res.json(
            makeError(ERROR_CODE.INVALID, "取得會員全部訂單失敗")
          );
        }
        res.status(200);
        return res.json({ ok: 1, result });
      });
    } catch (error) {
      console.log("ctl order getUserAll catchERROR :", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl order getUserAll catchERROR：${error}`,
      });
    }
  },
  // 拿取該筆訂單號的詳細訂單資料
  getOrder: (req, res) => {
    try {
      const uuid = req.params;
      orderModel.getOrder(uuid, (err, result) => {
        if (err) {
          console.log(`getOrder error：${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "取得訂單失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, result });
      });
    } catch (error) {
      console.log("ctl order getOrder catchERROR :", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl order gerorder catchERROR：${error}`,
      });
    }
  },
  // 變更訂單狀態
  update: (req, res) => {
    try {
      const { orderId, status } = req.body;
      orderModel.update(orderId, status, (err) => {
        if (err) {
          console.log(`update error：${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "變更訂單狀態失敗"));
        }
        res.status(200);
        return res.json({ ok: 1 });
      });
    } catch (error) {
      console.log("ctl order update catchERROR :", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl order update catchERROR：${error}`,
      });
    }
  },
  add: (req, res) => {
    const { userId, totalPrice, productList } = req.body.order;

    const handleAddOrder = new Promise((resolve, reject) => {
      // 比對庫存量是否足夠
      orderModel.getStorage(productList, (err, result) => {
        if (err) {
          return reject({ error: "比對庫存失敗" });
        }
        let renewArr = [];
        for (const i of productList) {
          const id = i.productId;
          for (const x of result) {
            if (x.id == id) {
              const storage = Number(x.storage) - Number(i.count);
              const sell = Number(x.sell) + Number(i.count);
              if (storage >= 0) {
                renewArr.push({ id, storage, sell });
              }
              if (storage < 0) {
                return reject({ error: `${x.productName}庫存不足` });
              }
            }
          }
        }
        return resolve(renewArr);
      });
    }) // 更新庫存量、銷售量
      .then((renewArr) => {
        orderModel.renew(renewArr, (err) => {
          if (err) {
            return Promise.reject({ error: "更新庫存、銷售量失敗" });
          }
          return;
        });
      }) // 寫入 order 表
      .then(() => {
        const orderid = uuidv4();
        orderModel.add(orderid, userId, totalPrice, (err) => {
          if (err) {
            return Promise.reject({ error: "新增訂單失敗" });
          }
          return orderid;
        });
      }) // 寫入 order_products 表
      .then((orderid) => {
        orderModel.addop(orderid, productList, (err) => {
          if (err) {
            return Promise.reject({ error: "新增商品銷售紀錄失敗" });
          }
          return orderid;
        });
      }) // 訂單新增完成 回傳responce
      .then((orderid) => {
        res.status(200);
        return res.json({ ok: 1, orderId: orderid });
      })
      .catch((err) => {
        res.status(404);
        return res.json(makeError(ERROR_CODE.INVALID, err.error));
      });
  },
};
module.exports = orderControllers;
