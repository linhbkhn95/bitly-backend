const helpers = require('../helpers/helpers');
const constants = require('../constants/constants');
const linkRepo = require('../repositories/link-repo');

exports.generateShortLink = (req, res) => {
  const { token, link } = req.body;
  if (!helpers.isValidToken(token)) {
      helpers.sendResponse(res, constants.response.unValidToken);
  } else if (!helpers.isValidUrl(link)) {
      helpers.sendResponse(res, constants.response.unValidLink);
  } else {
      let resData = null;
      const linkPromise = linkRepo.findLinkByFull(link);

      linkPromise.then((linkObj) => {
          if (linkObj) {
              resData = {
                  code: constants.response.ok.code,
                  message: constants.response.ok.message,
                  data: {
                      short_link: linkObj.short_link,
                      full_link: linkObj.full_link,
                  }
              };
          } else {
              const genShortLink = generateShortLink();
              const shortLink = helpers.getHost() + genShortLink;
              const fullLink = link.trim();
              return linkRepo.addLink(shortLink, fullLink);
          }
      }).then((storedLink) => {
          if (storedLink) {
              resData = {
                  code: constants.response.ok.code,
                  message: constants.response.ok.message,
                  data: {
                      short_link: storedLink.short_link,
                      full_link: storedLink.full_link,
                  }
              };
          }

          if (resData) {
              return helpers.sendResponse(res, resData);
          }

          return helpers.sendResponse(res, constants.response.error);

      }).catch((err) => {
            resData = JSON.parse(JSON.stringify(constants.response.error));
            resData.message = err.toString();
            return helpers.sendResponse(res, resData);
      });
  }


};

function generateShortLink() {
    const now = Date.now();
    let result = helpers.base_encode(now);
    const maxLength = helpers.getMaxShortLen();
    if (result.length > maxLength) {
        result = result.substring(0, maxLength)
    }
    return result;
}