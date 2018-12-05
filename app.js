const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parse');
const logger = require("morgan");
const helper = require("./helpers/helpers");
const dotEnv = require("dotenv");
var session = require("express-session");
const cronJob = require("./cronjob/cronjob");
const MongoStore = require("connect-mongo")(session);
dotEnv.config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// app.use(
//   session({
//     secret: "keyboard cat",
//     cookie: { maxAge: 60000 },
//     resave: false,
//     saveUninitialized: false
//   })
// );https://github.com/expressjs/sessionhttps://https://github.com/expressjs/sessionhttps://github.com/expressjs/sessiongithub.com/expressjs/session
app.use(
  session({
    token: "dadadajdadjajdad",
    secret: "fdakjdakdalksd",
    resave: true,
    saveUninitialized: true,
    autoSave: true,
    cookie: { secure: true },
    store: new MongoStore({
      url: "mongodb://localhost/tiki_bitly",
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
  })
);
helper.connectDb();
cronJob.deleteInFrequentlyLinksJob();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
