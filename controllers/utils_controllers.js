const bcrypt = require("bcrypt");
const utilsModel = require("../models/utils");
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

const utilsControllers = {
  // 驗證jwt token
  verification: (req, res) => {
    try {
      let authHeader = req.headers["authorization"] || "";
      const token = authHeader.replace("Bearer ", "");
      let jwtData;

      try {
        jwtData = jwt.verify(token, jwtSecretKey);
      } catch (err) {
        console.log(`jwt比對錯誤：${err.toString()}`);
      }

      if (!jwtData) {
        res.status(401);
        return res.json(makeError(ERROR_CODE.UNAUTHORIZED, "驗證失敗"));
      }
      if (jwtData.role === "user") {
        res.status(200);
        return res.json({ ok: 1, role: "user", username: jwtData.username });
      }
      if (jwtData.role === "admin") {
        res.status(200);
        return res.json({ ok: 1, role: "admin", username: jwtData.username });
      }
    } catch (error) {
      console.log("ctl utils verification catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl utils verification catchERROR：${error}`,
      });
    }
  },
};

module.exports = utilsControllers;
