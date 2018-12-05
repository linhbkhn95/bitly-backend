const mongoose = require("mongoose");
const constants = require("../constants/constants");
const base62 = require("base62");
const md5 = require("md5");
const request = require("request");
const cheerio = require("cheerio");
exports.connectDb = () => {
  mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error"));

  db.once("open", function() {
    // we're connected!
    console.log("MongoDB connection opened");
  });
};

exports.sendResponse = (res, response, status = constants.statusCode.ok) => {
  res.status(status).json(response);
};

exports.sendResponseSuccess = (res, data, status = constants.statusCode.ok) => {
  var resData = {
    code: constants.response.ok.code,
    message: constants.response.ok.message,
    data
  };
  res.status(status).json(resData);
};
exports.sendResponseError = (
  res,
  message,
  status = constants.statusCode.systemError
) => {
  var resData = { ...constants.error, message };

  res.status(status).json(resData);
};
exports.isValidUrl = url => {
  if (!url || url.length === 0) {
    return false;
  }

  const res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res != null;
};

exports.isValidToken = token => {
  if (!token || token.length === 0) {
    return false;
  }

  // todo ... need more logic to check token is valid or not
  return true;
};
exports.getTitleWebSite = url => {
  return new Promise((resolve, reject) => {
    try {
      request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(body);
          var title = $("title").text();
          console.log("title web", title);
          resolve(title);
        }
        resolve("");
      });
    } catch (error) {
      resolve("");
    }
  });
};
exports.base_encode = num => {
  return base62.encode(num);
};

exports.base_decode = code => {
  return base62.decode(code);
};

exports.md5_encode = string => {
  return md5(string);
};

exports.extractReqIP = req => {
  return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
};

exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

exports.getHost = () => {
  return process.env.HOST;
};

exports.getMaxShortLen = () => {
  return process.env.SHORT_LINK_LENGTH;
};
