const bcrypt = require("bcrypt");
const userModel = require("../models/user");
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
  // 註冊
  handleRegister: (req, res) => {
    try {
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
          (err, data) => {
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
                {
                  username: req.body.username,
                  userId,
                  id: data.insertId,
                  role: "user",
                },
                jwtSecretKey,
                options
              ),
            });
          }
        );
      });
    } catch (error) {
      console.log("ctl users handleRegister catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl users handleRegister catchERROR：${error}`,
      });
    }
  },
  // 登入
  handleLogin: (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        console.log("login error1: 登入資料不齊全");
        res.status(400);
        return res.json(makeError(ERROR_CODE.INVALID, "登入資料不齊全"));
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
                id: userdata.id,
                role: "user",
              },
              jwtSecretKey,
              options
            ),
          });
        });
      });
    } catch (error) {
      console.log("ctl users handleLogin catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl users handleLogin catchERROR：${error}`,
      });
    }
  },
  // 拿取會員資料
  getUser: (req, res) => {
    try {
      const { id } = req.jwtData;
      userModel.getUser(id, (err, result) => {
        if (err) {
          console.log("user getUser error：", err.toString());
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "拿取會員資料失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, result });
      });
    } catch (error) {
      console.log("ctl users getUser catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl users getUser catchERROR：${error}`,
      });
    }
  },
  // 編輯會員資料
  update: (req, res) => {
    try {
      const { email, realName, phone } = req.body;
      const { id } = req.jwtData;
      const param = { id, email, realName, phone };
      userModel.update(param, (err) => {
        if (err) {
          console.log("user update error：", err.toString());
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "編輯會員資料失敗"));
        }
        res.status(200);
        return res.json({ ok: 1 });
      });
    } catch (error) {
      console.log("ctl users update catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl users update catchERROR：${error}`,
      });
    }
  },
};

module.exports = usersControllers;
