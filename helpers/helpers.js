const mongoose = require('mongoose');
const constants = require('../constants/constants');
const base62 = require('base62');
const md5 = require('md5');

exports.connectDb = () => {
    mongoose.connect(process.env.DB_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error'));

    db.once('open', function() {
        // we're connected!
        console.log('MongoDB connection opened');
    });
};

exports.sendResponse = (res, response, status = constants.statusCode.ok) => {
    res.status(status).json(response);
};

exports.isValidUrl = (url) => {
    if (!url || url.length === 0) {
        return false;
    }

    const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return res != null;
};

exports.isValidToken = (token) => {
  if (!token || token.length === 0) {
      return false;
  }

  // todo ... need more logic to check token is valid or not
    return true;
};


exports.base_encode = (num) => {
    return base62.encode(num);
};

exports.base_decode = (code) => {
    return base62.decode(code);
};

exports.md5_encode = (string) => {
  return md5(string);
};

exports.extractReqIP = (req) => {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
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
