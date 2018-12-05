const Link = require("../models/links");

exports.findLinkByFull = link => Link.findOne({ full_link: link }).exec();

exports.addLink = (short_link, full_link, title_link) => {
  const linkObj = new Link({
    short_link,
    full_link,
    title_link
  });
  return linkObj.save();
};
