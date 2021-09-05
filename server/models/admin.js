const db = require("../config/dbConfig");

const adminModel = {
  login: (username, cb) => {
    db.query(
      "select * from admin where username = ?",
      [username],
      (err, result) => {
        if (err) return cb(err);
        cb(null, result[0]);
      }
    );
  },
};

module.exports = adminModel;
