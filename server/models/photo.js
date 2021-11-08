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
      db.query("SELECT * FROM photos WHERE productid = ?", [id], (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      });
    } catch (error) {
      console.log("modles photo getOne catchERROR ：", error);
      cb(error);
    }
  },
  update: (result, updateList, productId, cb) => {
    try {
      if (result.length != updateList.length) {
        return cb("err: 更新圖片發生錯誤");
      }
      let sql = "REPLACE INTO photo (id,url) values ";
      let sqlValues = "";
      let sqlWhere = [];
      for (let i = 0; i < result.length; i++) {
        if (i == result.length - 1) {
          sqlValues += "(?, ?)";
          sqlWhere.push(updateList[i]);
          sqlWhere.push(result[i]);
          break;
        }
        sqlValues += "(?, ?), ";
        sqlWhere.push(updateList[i]);
        sqlWhere.push(result[i]);
      }
      sql += sqlValues;
      db.query(sql, sqlWhere, (err) => {
        if (err) return cb(err);
        return cb(null);
      });
    } catch (error) {
      console.log("modles photo update catchERROR ：", error);
      cb(error);
    }
  },
  delete: (id, cb) => {
    try {
      db.query("DELETE FROM photos WHERE id = ?", [id], (err) => {
        if (err) return cb(err);
        return cb(null);
      })
    } catch (error) {
      console.log("modles photo delete catchERROR ：", error);
      cb(error);
    }
  }
};

module.exports = photoModel;
