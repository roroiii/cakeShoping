const productModel = require("../models/product");

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

const productControllers = {
  // 獲取商品總數
  getAllList: (req, res) => {
    try {
      productModel.getAllList((err, result) => {
        if (err) {
          console.log(`getAllLimit error：${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "取得商品總數失敗"));
        }
        const allLimit = result[0]["COUNT(*)"];
        res.status(200);
        return res.json({ ok: 1, allLimit });
      });
    } catch (error) {
      console.log("ctl product getAllList catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl product getAllList catchERROR：${error}`,
      });
    }
  },
  // 拿取全部商品
  getAll: (req, res) => {
    try {
      productModel.getAll((err, result) => {
        if (err) {
          console.log(`getAll error：${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "取得商品列表失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, result });
      });
    } catch (error) {
      console.log("ctl product getAll catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl product getAll catchERROR：${error}`,
      });
    }
  },
  // 拿取單一商品
  getOne: (req, res) => {
    try {
      const { id } = req.params;
      productModel.getOne(id, (err, result) => {
        if (err) {
          console.log(`getOne error：${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "取得單一商品失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, result });
      });
    } catch (error) {
      console.log("ctl product getOne catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl product getOne catchERROR：${error}`,
      });
    }
  },
  // 新增商品
  add: (req, res) => {
    try {
      const { productName, price, type, articlel, isShow, storage, sell } =
        req.body;
      if (
        !productName ||
        !price ||
        !type ||
        !articlel ||
        !isShow ||
        !storage ||
        !sell
      ) {
        console.log("add error1: 新增商品資料不齊全");
        res.status(400);
        return res.json(makeError(ERROR_CODE.INVALID, "新增商品資料不齊全"));
      }
      productModel.add(
        { productName, price, type, articlel, isShow, storage, sell },
        (err) => {
          if (err) {
            console.log(`add error2: ${err.toString()}`);
            res.status(403);
            return res.json(makeError(ERROR_CODE.DUPLICATED, "新增商品失敗"));
          }
          res.status(200);
          return res.json({ ok: 1 });
        }
      );
    } catch (error) {
      console.log("ctl product add catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl product add catchERROR：${error}`,
      });
    }
  },
  // 刪除商品
  delete: (req, res) => {
    try {
      const { id } = req.params;
      productModel.delete(id, (err) => {
        if (err) {
          console.log(`delete error2: ${err.toString()}`);
          res.status(403);
          return res.json(makeError(ERROR_CODE.DUPLICATED, "刪除商品失敗"));
        }
        res.status(200);
        return res.json({ ok: 1 });
      });
    } catch (error) {
      console.log("ctl product delete catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl product delete catchERROR：${error}`,
      });
    }
  },
  // 變更上架、下架狀態
  status: (req, res) => {
    try {
      const { status, id } = req.body;
      productModel.status(status, id, (err) => {
        if (err) {
          console.log(`status error2: ${err.toString()}`);
          res.status(403);
          return res.json(
            makeError(ERROR_CODE.DUPLICATED, "上架或下架商品失敗")
          );
        }
        res.status(200);
        return res.json({ ok: 1 });
      });
    } catch (error) {
      console.log("ctl product status catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl product status catchERROR：${error}`,
      });
    }
  },
};

module.exports = productControllers;
