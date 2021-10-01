const db = require("../config/dbConfig");

const photoModel = {
  upload: (result, productId, cb) => {
    try {
      let resultString = result.toString();
      let sql = "INSERT INTO photos(url, productid) VALUES ";
      let sqlValues = "";
      let sqlWhere = [];
      for (let i = 0; i < result.length; i++) {
        if (i == result.length - 1) {
          sqlValues += `(?, ?)`;
          sqlWhere.push(result[i]);
          sqlWhere.push(productId);
          break;
        }
        sqlValues += `(?, ?), `;
        sqlWhere.push(result[i]);
        sqlWhere.push(productId);
      }
      sql += sqlValues;
      console.log(sql);
      console.log(sqlWhere);
      db.query(sql, sqlWhere, (err) => {
        cb(err);
        return;
      });
    } catch (error) {
      console.log("modles photo upload catchERROR ：", error);
      cb(error);
    }
  },
  getAll: (cb) => {
    try {
      db.query("SELECT * FROM photos WHERE 1=1", (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      });
    } catch (error) {
      console.log("modles photo getAll catchERROR ：", error);
      cb(error);
    }
  },
  getOne: (id, cb) => {
    try {
      db.query("SELECT * FROM photos WHERE id = ?", [id], (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      });
    } catch (error) {
      console.log("modles photo getOne catchERROR ：", error);
      cb(error);
    }
  },
};

module.exports = photoModel;
