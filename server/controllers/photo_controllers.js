const { imgurUpload } = require("../utils/photo");
const photoModel = require("../models/photo");

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

const photoControllers = {
  // 上傳圖片
  upload: (req, res) => {
    try {
      const { productId } = req.body;

      if (req.files === undefined || req.files.length === 0) {
        console.log("upload error : no images found");
        res.status(403);
        return res.json(makeError(ERROR_CODE.INVALID, "no images found"));
      }
      const encodedFiles = req.files.map((file) => {
        return file.buffer.toString("base64");
      });
      const imageUpload = new Promise((resolve, reject) => {
        let result = imgurUpload(encodedFiles);
        try {
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })
        .then((result) => {
          photoModel.upload(result, productId, (err) => {
            if (err) {
              console.log("upload error：", err.toString());
              res.status(403);
              return res.json(
                makeError(ERROR_CODE.INVALID, "Failed to write data")
              );
            }
            res.status(200);
            return res.json({ ok: 1 });
          });
        })
        .catch((err) => {
          console.log("imageUpload error：", err);
          res.status(500);
          return res.json(
            makeError(ERROR_CODE.INVALID, "Failed to write to imgur")
          );
        });
    } catch (error) {
      console.log("ctl photo upload catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl photo upload catchERROR：${error}`,
      });
    }
  },
  // 拿取全部商品圖片
  getAll: (req, res) => {
    try {
      photoModel.getAll((err, result) => {
        if (err) {
          console.log("photo getAll error：", err.toString());
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "拿取全部圖片失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, result });
      });
    } catch (error) {
      console.log("ctl photo getAll catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl photo getAll catchERROR：${error}`,
      });
    }
  },
  // 拿取單一商品圖片
  getOne: (req, res) => {
    try {
      const { id } = req.params;
      photoModel.getOne(id, (err, result) => {
        if (err) {
          console.log("photo getOne error：", err.toString());
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "拿取單一圖片失敗"));
        }
        res.status(200);
        return res.json({ ok: 1, result });
      });
    } catch (error) {
      console.log("ctl photo getOne catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl photo getOne catchERROR：${error}`,
      });
    }
  },
  // 編輯商品圖片
  update: (req, res) => {
    try {
      const { productId, updateList } = req.body;
      if (req.files === undefined || req.files.length === 0) {
        console.log("upload error : no images found");
        res.status(403);
        return res.json(makeError(ERROR_CODE.INVALID, "no images found"));
      }
      const encodedFiles = req.files.map((file) => {
        return file.buffer.toString("base64");
      });
      const imageUpload = new Promise((resolve, reject) => {
        let result = imgurUpload(encodedFiles);
        try {
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })
        .then((result) => {
          photoModel.update(result, updateList, productId, (err) => {
            if (err) {
              console.log("upload error：", err.toString());
              res.status(403);
              return res.json(
                makeError(ERROR_CODE.INVALID, "Failed to write data")
              );
            }
            res.status(200);
            return res.json({ ok: 1 });
          });
        })
        .catch((err) => {
          console.log("imageUpdate error：", err);
          res.status(500);
          return res.json(
            makeError(ERROR_CODE.INVALID, "Failed to write to imgur")
          );
        });
    } catch (error) {
      console.log("ctl photo update catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl photo update catchERROR：${error}`,
      });
    }
  },
  // 刪除商品圖片
  delete: (req, res) => {
    try {
      const { id } = req.params;
      photoModel.delete(id, (err) => {
        if (err) {
          console.log("photo delete error：", err.toString());
          res.status(403);
          return res.json(makeError(ERROR_CODE.INVALID, "刪除圖片失敗"));
        }
        res.status(200);
        return res.json({ ok: 1 });
      })
    } catch (error) {
      console.log("ctl photo delete catchERROR ：", error);
      res.status(404);
      return res.json({
        ok: 0,
        message: `ctl photo delete catchERROR：${error}`,
      });
    }
  }
};

module.exports = photoControllers;
