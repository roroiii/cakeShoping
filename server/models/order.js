const db = require("../config/dbConfig");

const orderModel = {
  getPage: (startId, endId, cb) => {
    db.query(
      "SELECT * FROM `order` WHERE id BETWEEN ? AND ?",
      [startId, endId],
      (err, result) => {
        if (err) return cb(err);
        return cb(null, result);
      }
    );
  },
  getAll: (cb) => {
    try {
      db.query("SELECT COUNT(*) FROM `order` WHERE 1=1", (err, result) => {
        if (err) return cb(err);
        return cb(null, result);
      });
    } catch (error) {
      console.log("models order getAll catchERROR : ", error);
      cb(error);
    }
  },
  getUserAll: (userId, cb) => {
    try {
      db.query(
        "SELECT * FROM `order` WHERE userId = ?",
        [userId],
        (err, result) => {
          if (err) return cb(err);
          return cb(null, result);
        }
      );
    } catch (error) {
      console.log("models order getUserAll catchERROR : ", error);
      cb(error);
    }
  },
  getOrder: (uuid, cb) => {
    try {
      db.query(
        "SELECT * FROM (SELECT userId, status, totalPrice, orderid FROM `order` WHERE orderid = ? ) AS a INNER JOIN (SELECT orderid, productId, count, unitPrice FROM order_products) AS b ON (a.orderid = b.orderid) INNER JOIN (SELECT id, productName FROM products) AS c ON (b.productId = c.id)",
        [uuid],
        (err, result) => {
          if (err) return cb(err);
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
      db.query("UPDATE `order` SET status = ? WHERE orderid = ?",
      [status, orderId],
        (err) => {
          if (err) return cb(err);
          return cb(null);
        });
    } catch (error) {
      console.log("models order update catchERROR ：", error);
      cb(error);
    }
  },
  getStorage: (productList, cb) => {
    try {
      let sql = "SELECT * FROM products WHERE ";
      let sqlWhere = "";
      let sqlValues = [];
      for (let i = 0; i < productList.length; i++) {
        if (i == productList.length - 1) {
          sqlWhere += "id = ?";
          sqlValues.push(productList[i].productId);
          break;
        }
        sqlWhere += "id = ? OR ";
        sqlValues.push(productList[i].productId);
      }
      sql += sqlWhere;
      db.query(sql, sqlValues, (err, result) => {
        console.log(result);
        if (err) return cb(err);
        return cb(null, result);
      });
    } catch (error) {
      console.log("models order getStorage catchERROR ：", error);
      cb(error);
    }
  },
  renew: (renewArr, cb) => {
    try {
      let sql = "INSERT INTO products (id,storage,sell) values ";
      let sqlValues = "";
      let sqlWhere = [];
      for (let i = 0; i < renewArr.length; i++) {
        if (i == renewArr.length - 1) {
          sqlValues += "(?, ?, ?)";
          sqlWhere.push(renewArr[i].id);
          sqlWhere.push(renewArr[i].storage);
          sqlWhere.push(renewArr[i].sell);
          break;
        }
        sqlValues += "(?, ?, ?), ";
        sqlWhere.push(renewArr[i].id);
        sqlWhere.push(renewArr[i].storage);
        sqlWhere.push(renewArr[i].sell);
      }
      sql += sqlValues;
      sql +=
        " ON DUPLICATE KEY UPDATE storage = VALUES(storage), sell = VALUES(sell)";
      db.query(sql, sqlWhere, (err) => {
        if (err) return cb(err);
        return cb(null);
      });
    } catch (error) {
      console.log("modles order renew catchERROR ：", error);
      cb(error);
    }
  },
  add: (orderid, userId, totalPrice, cb) => {
    try {
      db.query(
        "INSERT INTO `order`(orderid, userId, totalPrice, status) VALUES(?, ?, ?, ?)",
        [orderid, userId, totalPrice, 0],
        (err) => {
          if (err) return cb(err);
          return cb(null);
        }
      );
    } catch (error) {
      console.log("modles order add catchERROR ：", error);
      cb(error);
    }
  },
  addop: (orderid, productList, cb) => {
    try {
      let sql =
        "INSERT INTO order_products(orderid, productId, count, unitPrice) VALUES ";
      let sqlValues = "";
      let sqlWhere = [];
      for (let i = 0; i < productList.length; i++) {
        if (i == productList.length - 1) {
          sqlValues += `(?, ?, ?, ?)`;
          sqlWhere.push(orderid);
          sqlWhere.push(productList[i].productId);
          sqlWhere.push(productList[i].count);
          sqlWhere.push(productList[i].unitPrice);
          break;
        }
        sqlValues += `(?, ?, ?, ?), `;
        sqlWhere.push(orderid);
        sqlWhere.push(productList[i].productId);
        sqlWhere.push(productList[i].count);
        sqlWhere.push(productList[i].unitPrice);
      }
      sql += sqlValues;
      db.query(sql, sqlWhere, (err) => {
        if (err) return cb(err);
        return cb(null);
      });
    } catch (error) {
      console.log("modles order addop catchERROR ：", error);
      cb(error);
    }
  },
  addRecipient: (param, cb) => {
    try {
      const { orderid, name, phone, address, email } = param;
      db.query(
        "INSERT INTO recipients(name, phone, email, address, orderId) VALUES(?, ?, ?, ?, ?)",
        [name, phone, email, address, orderid],
        (err) => {
          if (err) return cb(err);
          return cb(null);
        }
      );
    } catch (error) {
      console.log("modles order addRecipient catchERROR ：", error);
      cb(error);
    }
  },
};

module.exports = orderModel;
