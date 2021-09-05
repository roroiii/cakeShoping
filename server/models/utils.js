const db = require("../config/dbConfig");

const utilsModel = {
  verification: (username, cb) => {
    db.query(
      "select username, email, realName, phone, userId from users where username = ?",
      [username],
      (err, result) => {
        if (err) return cb(err);
        return cb(null, result[0]);
      }
    );
  },
};

module.exports = utilsModel;
