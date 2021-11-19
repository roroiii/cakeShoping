const bcrypt = require("bcrypt");
const adminModel = require("../models/admin");
const jwt = require("jsonwebtoken");
const salRounds = 10;

const jwtSecretKey = process.env.JWT_KEY || "test_key";

const ERROR_CODE = {
  INVALID: 1, // 无效的
  UNAUTHORIZED: 2, // 未经授权
  DUPLICATED: 3, // 重复
};

const makeError = (code, message) => ({
  code,
  message,
  ok: 0,
});

const adminControllers = {
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      console.log("login error1: 登入資料不齊全");
      res.status(400);
      return res.json(makeError(ERROR_CODE.INVALID, "登入資料不齊全"));
    }
    adminModel.login(username, (err, admindata) => {
      if (err) {
        console.log(`login error2: ${err.toString()}`);
        res.status(500);
        return res.json(makeError(ERROR_CODE.INVALID, "登入失敗"));
      }
      if (!admindata) {
        res.status(200);
        return res.json(makeError(ERROR_CODE.INVALID, "帳號或密碼錯誤"));
      }
      bcrypt.compare(password, admindata.password, (err, isSucess) => {
        if (err || !isSucess) {
          res.status(200);
          return res.json(makeError(ERROR_CODE.INVALID, "帳號或密碼錯誤"));
        }
        const options = { expiresIn: "7 day" };
        res.status(200);
        return res.json({
          ok: 1,
          token: jwt.sign(
            {
              username: req.body.username,
              role: "admin",
            },
            jwtSecretKey,
            options
          ),
        });
      });
    });
  },
};

module.exports = adminControllers;
