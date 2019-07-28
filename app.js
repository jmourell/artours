var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const config = require("./config");

const knex = require("knex")(config.db);
const models = require("./models")(knex);
/*
Routes for the server. Note that these are explicitly injected the
initialized 'services', including the database methods and logger.
We use this kind of 'dependency injection' to prevent arbitrarily
'require'-ing code everywhere. You'll appreciate this when writing tests
in this repo. Another benefit, if you use dependency injection its much
harder to end up with circular dependencies =)
*/
const apiRouter = require("./routes")(models);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
