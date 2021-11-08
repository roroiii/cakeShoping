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
      const endId = startId + Number(limit) - 1;
      orderModel.getPage(startId, endId, (err, result) => {
        if (err) {
          console.log(`getPage error：${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "取得該頁訂單失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, result: result });
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
      const { userId } = req.body;
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
      const uuid = req.params.uuid;
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
  // 建立訂單
  add: (req, res) => {
    const userId = req.jwtData.id;

    const { totalPrice, productList, name, phone, address, email } = req.body;

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
    });
    handleAddOrder
      .then(async (renewArr) => {
        // 更新庫存量、銷售量
        return renewPromise(renewArr);
      })
      .then(() => {
        const orderid = uuidv4();
        // 寫入 order 表
        return addPromise(orderid, userId, totalPrice);
      })
      .then((orderid) => {
        // 寫入 order_products 表
        return addopPromise(orderid, productList);
      })
      .then((orderid) => {
        // 寫入 recipients 表
        return recipientPromise(orderid, name, phone, address, email);
      })
      .then((orderid) => {
        // 訂單新增完成 回傳responce
        res.status(200);
        return res.json({ ok: 1, orderId: orderid });
      })
      .catch((err) => {
        res.status(404);
        return res.json(makeError(ERROR_CODE.INVALID, err.error));
      });
  },
};
function renewPromise(renewArr) {
  return new Promise((res, rej) => {
    orderModel.renew(renewArr, (err) => {
      if (err) {
        console.log("renewPromise error :", err);
        return rej({ error: "更新庫存、銷售量失敗" });
      }
      return res();
    });
  });
}
function addPromise(orderid, userId, totalPrice) {
  return new Promise((res, rej) => {
    orderModel.add(orderid, userId, totalPrice, (err) => {
      if (err) {
        console.log("addPromise error :", err);
        return rej({ error: "新增訂單失敗" });
      }
      return res(orderid);
    });
  });
}
function addopPromise(orderid, productList) {
  return new Promise((res, rej) => {
    orderModel.addop(orderid, productList, (err) => {
      if (err) {
        console.log("addopPromise error :", err);
        return rej({ error: "新增商品銷售紀錄失敗" });
      }
      return res(orderid);
    });
  });
}
function recipientPromise(orderid, name, phone, address, email) {
  return new Promise((res, rej) => {
    orderModel.addRecipient({ orderid, name, phone, address, email }, (err) => {
      if (err) {
        console.log("recipientPromise error :", err);
        return rej({ error: "新增購買者訂購資料失敗" });
      }
      return res(orderid);
    });
  });
}
module.exports = orderControllers;
