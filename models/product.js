const db = require("../config/dbConfig");

const productModel = {
  getAllList: (cb) => {
    try {
      db.query("SELECT COUNT(*) FROM products WHERE 1=1", (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      });
    } catch (error) {
      console.log("models product getAllList catchERROR ：", error);
      cb(error);
    }
  },
  getAll: (cb) => {
    try {
      db.query("SELECT * FROM products WHERE 1=1", (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      });
    } catch (error) {
      console.log("models product getAll catchERROR ：", error);
      cb(error);
    }
  },
  getOne: (id, cb) => {
    try {
      db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      });
    } catch (error) {
      console.log("models product getOne catchERROR ：", error);
      cb(error);
    }
  },
  add: (data, cb) => {
    try {
      const { productName, price, type, articlel, isShow, storage, sell } =
        data;
      db.query(
        "INSERT INTO products(productName, price, type, articlel, isShow, storage, sell) values(?, ?, ?, ?, ?, ?, ?)",
        [productName, price, type, articlel, isShow, storage, sell],
        (err) => {
          if (err) return cb(err);
          return cb(null);
        }
      );
    } catch (error) {
      console.log("models product add catchERROR ：", error);
      cb(error);
    }
  },
  delete: (id, cb) => {
    try {
      db.query(
        "UPDATE products SET isDeleted = 1 WHERE id = ?",
        [id],
        (err) => {
          if (err) return cb(err);
          return cb(null);
        }
      );
    } catch (error) {
      console.log("models product delete catchERROR ：", error);
      cb(error);
    }
  },
  status: (status, id, cb) => {
    try {
      db.query(
        "UPDATE products SET isShow = ? WHERE id = ?",
        [status, id],
        (err) => {
          if (err) return cb(err);
          return cb(null);
        }
      );
    } catch (error) {
      console.log("models product status catchERROR ：", error);
      cb(error);
    }
  },
  update: (param, cb) => {
    try {
      const { id, productName, price, type, articlel, isShow, storage, sell } =
        param;
      db.query(
        "UPDATE products SET productName = ?, price = ?, type = ?, articlel = ?, isShow = ?, storage = ?, sell = ? WHERE id = ?",
        [productName, price, type, articlel, isShow, storage, sell, id],
        (err) => {
          if (err) return cb(err);
          return cb(null);
        }
      );
    } catch (error) {
      console.log("models product update catchERROR ：", error);
      cb(error);
    }
  },
};

module.exports = productModel;
