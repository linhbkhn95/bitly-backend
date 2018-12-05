const AcecssHistory = require("../models/access-histories");

exports.findAcessLinkByFull = (link_id) => AcecssHistory.findOne({ link_id }).exec();

exports.add = data => {
  const accesHistory = new AcecssHistory(data);
  return accesHistory.save();
};
