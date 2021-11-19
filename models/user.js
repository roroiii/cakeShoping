const db = require("../config/dbConfig");

const userModel = {
  addUser: (userdata, cb) => {
    try {
      const { username, password, email, realName, phone, userId } = userdata;
      db.query(
        "INSERT INTO users(username, password, email, realName, phone, userId) VALUES(?, ?, ?, ?, ?, ?)",
        [username, password, email, realName, phone, userId],
        (err, result) => {
          if (err) return cb(err);
          cb(null, result);
        }
      );
    } catch (error) {
      console.log("models user addUser catchERROR ：", error);
      cb(error);
    }
  },
  login: (username, cb) => {
    try {
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, result) => {
          if (err) return cb(err);
          cb(null, result[0]);
        }
      );
    } catch (error) {
      console.log("models user login catchERROR ：", error);
      cb(error);
    }
  },
  getUser: (id, cb) => {
    try {
      db.query(
        "SELECT id, username, email, realName, phone FROM users WHERE id = ?",
        [id],
        (err, result) => {
          if (err) return cb(err);
          cb(null, result);
        }
      );
    } catch (error) {
      console.log("models user getUser catchERROR ：", error);
      cb(error);
    }
  },
  update: (param, cb) => {
    try {
      const { id, email, realName, phone } = param;
      db.query(
        "UPDATE users SET email = ?, realName = ?, phone = ? WHERE id = ?",
        [email, realName, phone, id],
        (err) => {
          if (err) return cb(err);
          cb(null);
        }
      );
    } catch (error) {
      console.log("models user update catchERROR ：", error);
      cb(error);
    }
  },
};

module.exports = userModel;
