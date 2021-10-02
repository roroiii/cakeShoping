const db = require("../config/dbConfig");

const orderModel = {
  getAll: (userId, cb) => {
    try {
      db.query(
        "SELECT * FROM order WHERE userId = ?",
        [userId],
        (err, result) => {
          if (err) {
            return cb(err);
          }
          return cb(null, result);
        }
      );
    } catch (error) {
      console.log("models order getAll catchERROR : ", error);
      cb(error);
    }
  },
  getOrder: (uuid, cb) => {
    try {
      db.query(
        "SELECT * FROM (SELECT userId, status, totalPrice, orderid FROM order WHERE orderid = ? ) AS a INNER JOIN (SELECT orderid, productId, count, unitPrice FROM order_products) AS b ON (a.orderid = b.orderid) INNER JOIN (SELECT id, productName FROM products) AS c ON (b.productId = c.id)",
        [uuid],
        (err, result) => {
          if (err) {
            return cb(err);
          }
          return cb(null, result);
        }
      );
    } catch (error) {
      console.log("models order getOder catchERROR : ", error);
      cb(error);
    }
  },
  update: (orderId, status, cb) => {
    try {
      db.query("UPDATE order SET status = ? WHERE orderId = ?"),
        [status, orderId],
        (err) => {
          if (err) {
            return cb(err);
          }
          return cb(null);
        };
    } catch (error) {
      console.log("models order update catchERROR ：", error);
      cb(error);
    }
  },
};

module.exports = orderModel;
