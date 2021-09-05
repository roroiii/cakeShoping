const bcrypt = require("bcrypt");
const userModel = require("../models/user");
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

const usersControllers = {
  handleRegister: (req, res) => {
    const { username, password, realName, email, phone } = req.body;
    if (!username || !password || !realName || !email || !phone) {
      console.log("register error1: 註冊資料不齊全");
      res.status(400);
      return res.json(makeError(ERROR_CODE.INVALID, "註冊資料不齊全"));
    }
    bcrypt.hash(password, salRounds, (err, hash) => {
      if (err || !hash) {
        console.log(`bcrypt hash error: ${err.toString()}`);
        res.status(500);
        return res.json(makeError(ERROR_CODE.INVALID, "註冊失敗"));
      }
      const userId = Math.random().toString("16").replace(".", "");
      userModel.addUser(
        { username, password: hash, realName, email, phone, userId },
        (err) => {
          if (err) {
            console.log(`register error2: ${err.toString()}`);
            res.status(403);
            return res.json(makeError(ERROR_CODE.DUPLICATED, "該帳號已註冊"));
          }
          const options = { expiresIn: "7 day" };
          res.status(200);
          return res.json({
            ok: 1,
            token: jwt.sign(
              { username: req.body.username, userId, role: "user" },
              jwtSecretKey,
              options
            ),
          });
        }
      );
    });
  },
  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      console.log("login error1: 登入資料不齊全");
      res.status(400);
      return res.json(makeError(ERROR_CODE.INVALID, "登入資料不齊全"));
    }
    if (username === "admin") {
      adminModel.login(username, (err, admindata) => {
        if (err) {
          console.log(`login error2: ${err.toString()}`);
          res.status(500);
          return res.json(makeError(ERROR_CODE.INVALID, "登入失敗"));
        }
        if (!userdata) {
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
    }
    userModel.login(username, (err, userdata) => {
      if (err) {
        console.log(`login error2: ${err.toString()}`);
        res.status(500);
        return res.json(makeError(ERROR_CODE.INVALID, "登入失敗"));
      }
      if (!userdata) {
        res.status(200);
        return res.json(makeError(ERROR_CODE.INVALID, "帳號或密碼錯誤"));
      }
      bcrypt.compare(password, userdata.password, (err, isSucess) => {
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
              userId: userdata.userId,
              role: "user",
            },
            jwtSecretKey,
            options
          ),
        });
      });
    });
  },
};

module.exports = usersControllers;
