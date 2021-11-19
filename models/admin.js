const db = require("../config/dbConfig");

const adminModel = {
  login: (username, cb) => {
    try {
      db.query(
        "select * from admin where username = ?",
        [username],
        (err, result) => {
          if (err) return cb(err);
          cb(null, result[0]);
        }
      );
    } catch (error) {
      console.log("models admin login catchERROR ：", error);
      cb(error);
    }
  },
};

module.exports = adminModel;
