const helpers = require("../helpers/helpers");
const constants = require("../constants/constants");
const linkRepo = require("../repositories/link-repo");
const AcessLink = require("../repositories/access-histories");
const AcessLinkModel = require("../models/access-histories");
const accessLinkController = require("./accessLink-controller");
const notificationController = require("./notification-controller");

const LinkModel = require("../models/links");
const SubModel = require("../models/subs");

exports.generateShortLink = async (req, res) => {
  const { token, link } = req.body;
  //   if (!helpers.isValidToken(token)) {
  //     helpers.sendResponse(res, constants.response.unValidToken);
  //   } else if (!helpers.isValidUrl(link)) {
  //     helpers.sendResponse(res, constants.response.unValidLink);
  //   } else {
  let resData = null;
  const linkPromise = linkRepo.findLinkByFull(link);

  linkPromise
    .then(async linkObj => {
      if (linkObj) {
        return helpers.sendResponseSuccess(res, linkObj);
        // }
      } else {
        const genShortLink = generateShortLink();
        const shortLink = genShortLink;
        const fullLink = link.trim();
        const titleLink = await helpers.getTitleWebSite(fullLink);
        return linkRepo.addLink(shortLink, fullLink, titleLink);
      }
    })
    .then(async storedLink => {
      if (storedLink) {
        return helpers.sendResponseSuccess(res, storedLink);
      }

      return helpers.sendResponseError(res, "");
    })
    .catch(err => {
      console.log("generateShortLink err", err);
      return helpers.sendResponse(res, err.toString());
    });
};
exports.getFullLink = async (req, res) => {
  try {
    let { short_link } = req.params;
    short_link = short_link ? short_link.trim() : "";

    let link = await LinkModel.findOne({ short_link });
    console.log("link", link, link.full_link);
    if (link) {
      await LinkModel.update(
        { short_link },
        { count: link.count + 1, last_visited_at: Date.now() }
      );
      return helpers.sendResponseSuccess(res, link.full_link);
    } else {
      return helpers.sendResponse(res, "Link is not found");
    }
  } catch (error) {
    return helpers.sendResponse(res, error.toString());
  }
};
exports.getTopLink = (req, res) => {
  LinkModel.find({})
    .sort({ count: -1 })
    .limit(10)
    .exec(async (err, list) => {
      if (err) {
        // resData = JSON.parse(JSON.stringify(constants.response.error));
        // resData.message = err.toString();
        return helpers.sendResponseError(res, err.toString());
      }
      return helpers.sendResponseSuccess(res, list);
    });
};
function generateShortLink() {
  const now = Date.now();
  let result = helpers.base_encode(now);
  const maxLength = helpers.getMaxShortLen();
  if (result.length > maxLength) {
    result = result.substring(0, maxLength);
  }
  return result;
}
