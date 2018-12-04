const Link = require('../models/links');

exports.findLinkByFull = (link) => Link.findOne({ full_link: link }).exec();

exports.addLink = (shortLink, fullLink) => {
  const linkObj = new Link({
      short_link: shortLink,
      full_link: fullLink
  });
  return linkObj.save();
};