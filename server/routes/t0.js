const express = require("express");
const multer = require("multer");
const usersControllers = require("../controllers/users_controllers");
const utilsControllers = require("../controllers/utils_controllers");
const productControllers = require("../controllers/product_controllers");
const photoControllers = require("../controllers/photo_controllers");
const adminControllers = require("../controllers/admin_controllers");
const orderControllers = require("../controllers/order_controllers");
const orderModel = require("../models/order");

const router = express.Router();

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

router.post("/admain-login", adminControllers.handleLogin);

router.post("/register", usersControllers.handleRegister);

router.post("/login", usersControllers.handleLogin);

router.post("/user", usersControllers.getUser);

router.patch("/user", usersControllers.update);

router.post("/verification", utilsControllers.verification);

router.get("/productList", productControllers.getAllList);

router.get("/product", productControllers.getAll);

router.get("/product/:id", productControllers.getOne);

router.post("/product", productControllers.add);

router.delete("/product/:id", productControllers.delete);

router.post("/product-status", productControllers.status);

router.post("/photo", upload.array("avatar"), photoControllers.upload);

router.get("/photo", photoControllers.getAll);

router.get("/photo/:id", photoControllers.getOne);

router.get("/order/:uuid", orderControllers.getOrder);

router.get("/order", orderControllers.getAll);

router.patch("/order", orderControllers.update);

router.use((req, res) => {
  res.status(404).send("404 Not found");
});

module.exports = router;
