const Link = require("../models/links");
const Sub = require("../models/subs");

exports.findLinkByFull = link => Link.findOne({ full_link: link }).exec();

exports.addLink = (short_link, full_link, title_link) => {
  const linkObj = new Link({
    short_link,
    full_link,
    title_link
  });
  return linkObj.save();
};
exports.deleteLinksByLastVisit = time => {
  return Link.deleteMany({ last_visited_at: { $lte: time } });
};

exports.addSub = (auth, subData) => {
  const subObj = new Sub({ subObject: subData, auth });
  return subObj.save();
};
