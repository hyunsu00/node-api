var express = require("express");
var router = express.Router();

/**
 * @path {GET} http://localhost:3000/api/users
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
