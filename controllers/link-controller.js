const helpers = require("../helpers/helpers");
const constants = require("../constants/constants");
const linkRepo = require("../repositories/link-repo");
const AcessLink = require("../repositories/access-histories");
const AcessLinkModel = require("../models/access-histories");
const accessLinkController = require("./accessLink-controller");
const LinkModel = require("../models/links");

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
        //   let accessLink = await AcessLinkModel.update(
        //     { link_id: linkObj.id },
        //     { link_id: linkObj.id },
        //     { upsert: true }
        //   );
        console.log("linkdad", linkObj._id);
        await accessLinkController.updateorCreate(linkObj._id);
        let dataAcessLink = await AcessLinkModel.findOne({
          link_id: linkObj._id
        });
        if (dataAcessLink) {
          dataAcessLink = JSON.parse(JSON.stringify(dataAcessLink));
          linkObj = JSON.parse(JSON.stringify(linkObj));
          console.log("dataAcessLink", dataAcessLink, linkObj);
          dataAcessLink.full_link = linkObj.full_link;
          dataAcessLink.short_link = linkObj.short_link;
          dataAcessLink.title_link = linkObj.title_link;

          return helpers.sendResponseSuccess(res, dataAcessLink);
        }
      } else {
        const genShortLink = generateShortLink();
        const shortLink = helpers.getHost() + genShortLink;
        const fullLink = link.trim();
        const titleLink = await helpers.getTitleWebSite(fullLink);
        return linkRepo.addLink(shortLink, fullLink, titleLink);
      }
    })
    .then(async storedLink => {
      if (storedLink) {
        //   AcessLink.insert({ link_id: storedLink.id }, function(err, doc) {
        //     if (err) {
        //     }
        //   });
        // let accessLink = await AcessLinkModel.update(
        //   { link_id: storedLink.id },
        //   { link_id: storedLink.id },
        //   { upsert: true }
        // );
        await accessLinkController.updateorCreate(storedLink._id);
        let dataAcessLink = await AcessLinkModel.findOne({
          link_id: storedLink._id
        });
        if (dataAcessLink) {
          dataAcessLink = JSON.parse(JSON.stringify(dataAcessLink));
          storedLink = JSON.parse(JSON.stringify(storedLink));
          dataAcessLink.full_link = storedLink.full_link;
          dataAcessLink.short_link = storedLink.short_link;
          dataAcessLink.title_link = storedLink.title_link;
          return helpers.sendResponseSuccess(res, dataAcessLink);
        }
      }

      return helpers.sendResponseError(res, "");
    })
    .catch(err => {
      console.log("generateShortLink err", err);
      return helpers.sendResponse(res, err.toString());
    });
  // }
  //  try {
  //     link = link?link.trim():''
  //     if(link){
  //         let dataLink = await LinkModel.findOne({link});
  //         if(dataLink){
  //            await accessLinkController.updateorCreate(storedLink.id);

  //         }
  //         else{
  //             let newDataLink = await linkRepo.addLink(shortLink, fullLink);
  //             if(newDataLink){

  //             }
  //         }
  //     }

  //  } catch (error) {

  //  }
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
