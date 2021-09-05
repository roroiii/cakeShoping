const db = require("../config/dbConfig");

const userModel = {
  addUser: (userdata, cb) => {
    const { username, password, email, realName, phone, userId } = userdata;
    db.query(
      "insert into users(username, password, email, realName, phone, userId) values(?, ?, ?, ?, ?, ?)",
      [username, password, email, realName, phone, userId],
      (err, result) => {
        if (err) return cb(err);
        cb(null);
      }
    );
  },
  login: (username, cb) => {
    db.query(
      "select * from users where username = ?",
      [username],
      (err, result) => {
        if (err) return cb(err);
        cb(null, result[0]);
      }
    );
  },
};

module.exports = userModel;
