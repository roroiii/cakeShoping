const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const usersControllers = require("../controllers/users_controllers");
const utilsControllers = require("../controllers/utils_controllers");
const productControllers = require("../controllers/product_controllers");
const photoControllers = require("../controllers/photo_controllers");
const adminControllers = require("../controllers/admin_controllers");
const orderControllers = require("../controllers/order_controllers");
const orderModel = require("../models/order");
const jwtSecretKey = process.env.JWT_KEY || "test_key";

const router = express.Router();

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

// file init
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 限制 1 MB
  },
  fileFilter: (req, file, cb) => {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});
// jwttoken 驗證
const requireLogin = (req, res, next) => {
  let authHeader = req.headers["authorization"] || "";
  const token = authHeader.replace("Bearer ", "");
  let jwtData;

  try {
    jwtData = jwt.verify(token, jwtSecretKey);
  } catch (err) {
    console.log("jwt 驗證失敗", err);
  }

  if (!jwtData) {
    res.status(401);
    return res.json(makeError(ERROR_CODE.UNAUTHORIZED, "token 驗證失敗"));
  }

  req.jwtData = jwtData;
  next();
};
const onlyUser = (req, res, next) => {
  const identity = req.jwtData.role;
  if (identity !== "user") {
    return res.status(401).end();
  }
  next();
};
const onlyAdmin = (req, res, next) => {
  const identity = req.jwtData.role;
  if (identity !== "admin") {
    return res.status(401).end();
  }
  next();
};

router.post("/admain", adminControllers.handleLogin);

router.post("/register", usersControllers.handleRegister);

router.post("/login", usersControllers.handleLogin);

router.get("/user", requireLogin, onlyUser, usersControllers.getUser);

router.patch("/user", requireLogin, onlyUser, usersControllers.update);

router.get("/me", utilsControllers.verification);

router.get("/product", productControllers.getAll);

router.get("/product/:id", productControllers.getOne);

router.post("/product", requireLogin, onlyAdmin, productControllers.add);

router.delete("/product/:id", requireLogin, onlyAdmin, productControllers.delete);

router.patch("/product", requireLogin, onlyAdmin, productControllers.update);

router.post("/product/status", requireLogin, onlyAdmin, productControllers.status);

router.post("/photo", requireLogin, onlyAdmin, upload.array("avatar"), photoControllers.upload);

router.get("/photo", photoControllers.getAll);

router.get("/photo/:id", photoControllers.getOne);

router.delete("/photo/:id", requireLogin, onlyAdmin, photoControllers.delete)

router.get("/order/:uuid", requireLogin, orderControllers.getOrder);

router.get("/order", requireLogin, onlyAdmin, orderControllers.getPage);

router.patch("/order", requireLogin, onlyAdmin, orderControllers.update);

router.post("/order", requireLogin, orderControllers.add);

router.post("/orderUser", requireLogin, orderControllers.getUserAll);

router.get("/orderAll", requireLogin, onlyAdmin, orderControllers.getAll);

router.use((req, res) => {
  res.status(404).send("404 Not found");
});

module.exports = router;
