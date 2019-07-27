var express = require("express");
var router = express.Router();

const toursRouter = require("./tours");

module.exports = models => {
  router.use("/tours", toursRouter(models));

  return router;
};
