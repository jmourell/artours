var express = require("express");
var router = express.Router();

const toursRouter = require("./tours");

module.exports = models => {
  /* GET home page. */
  router.get("/", function(req, res, next) {
    res.render("index", { title: "Tours Api" });
  });
  router.use("/tours", toursRouter(models));

  return router;
};
