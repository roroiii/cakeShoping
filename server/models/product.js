const db = require("../config/dbConfig");

const productModel = {
  getAllList: (cb) => {
    db.query("SELECT COUNT(*) FROM products WHERE 1=1", (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    });
  },
  getAll: (page, limit, cb) => {
    const offset = (page - 1) * limit;
    // 因為 BETWEEN 會包含起始檢索值，所以+1處理
    const noffset = offset + 1;
    const nlist = offset + Number(limit);
    db.query(
      "SELECT * FROM products WHERE id BETWEEN ? AND ?",
      [noffset, nlist],
      (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      }
    );
  },
  add: (data, cb) => {
    const { productName, price, type, articlel, isShow } = data;
    db.query(
      "INSERT INTO products(productName, price, type, articlel, isShow) values(?, ?, ?, ?, ?)",
      [productName, price, type, articlel, isShow],
      (err) => {
        if (err) return cb(err);
        return cb(null);
      }
    );
  },
};

module.exports = productModel;
