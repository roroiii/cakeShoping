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
  getAllList: (req, res) => {
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
  },
  getAll: (req, res) => {
    const { page, limit } = req.query;
    productModel.getAll(page, limit, (err, result) => {
      if (err) {
        console.log(`getAll error：${err.toString()}`);
        res.status(403);
        return res.json(makeError(ERROR_CODE.INVALID, "取得商品列表失敗"));
      }
      res.status(200);
      return res.json({ ok: 1, result });
    });
  },
  add: (req, res) => {
    const { productName, price, type, articlel, isShow } = req.body;
    if (!productName || !price || !type || !articlel || !isShow) {
      console.log("add error1: 新增商品資料不齊全");
      res.status(400);
      return res.json(makeError(ERROR_CODE.INVALID, "新增商品資料不齊全"));
    }
    productModel.add({ productName, price, type, articlel, isShow }, (err) => {
      if (err) {
        console.log(`add error2: ${err.toString()}`);
        res.status(403);
        return res.json(makeError(ERROR_CODE.DUPLICATED, "新增商品失敗"));
      }
      res.status(200);
      return res.json({ ok: 1 });
    });
  },
};

module.exports = productControllers;
