const express = require("express");
const db = require("../config/dbConfig");
const usersControllers = require("../controllers/users_controllers");
const utilsControllers = require("../controllers/utils_controllers");
const productControllers = require("../controllers/product_controllers");

const router = express.Router();
// <測試區塊
const multer = require("multer");
// 測試區塊>
router.post("/register", usersControllers.handleRegister);

router.post("/login", usersControllers.handleLogin);

router.post("/verification", utilsControllers.verification);

router.get("/productList", productControllers.getAllList);

router.get("/product", productControllers.getAll);

router.post("/product", productControllers.add);

// <測試區塊
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});

router.post("/image", upload.array("avatar"), (req, res) => {
  const image = req.file.buffer;
  console.log(image);
  db.query(
    "INSERT INTO photo(photoString) values(?)",
    [req.file.buffer],
    (err) => {
      if (err) {
        console.log(err.toString());
        res.status(403);
        res.json({ ok: 0, masamge: "錯誤" });
        return;
      }
      res.status(200);
      res.json({ ok: 1, masamge: "成功" });
    }
  );
});
// 測試區塊>

module.exports = router;
