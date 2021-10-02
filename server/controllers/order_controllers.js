const orderModel = require("../models/order");
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
  // 拿取該會員全部訂單
  getAll: (req, res) => {
    try {
      const { userId } = req.query;
      orderModel.getAll(userId, (err, result) => {
        if (err) {
          console.log(`getAll error：${err.toString()}`);
          res.status(403);
          return res.json(
            makeError(ERROR_CODE.INVALID, "取得會員全部訂單失敗")
          );
        }
        res.status(200);
        return res.json({ ok: 1, result });
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
};
module.exports = orderControllers;
