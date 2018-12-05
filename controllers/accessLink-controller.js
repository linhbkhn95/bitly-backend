const AcessLinkModel = require("../models/access-histories");
const helpers = require("../helpers/helpers");
const constants = require("../constants/constants");
const LinkModel = require("../models/links");

module.exports = {
  getTopLink: async function(req, res) {
  //   let resData = null;
  //   try {
  //     AcessLinkModel.find({})
  //       .sort({ count: -1 })
  //       .limit(10)
  //       .exec(async (err, list) => {
  //         if (err) {
  //           // resData = JSON.parse(JSON.stringify(constants.response.error));
  //           // resData.message = err.toString();
  //           return helpers.sendResponseError(res, err.toString());
  //         }
  //         var result = [];
  //         if (list && list.length) {
  //           var listId = list.map(item => item.link_id.toString());
  //           // quan tam den thu tu trong mang
  //           //   .project({'short_link':true,'full_link':true})
  //           var listLink = await LinkModel.find(
  //             { _id: listId },
  //             { short_link: true, full_link: true, title_link: true }
  //           );
  //           if (listLink && listLink.length > 0) {
  //             result = listLink.map((link, index) => {
  //               link = JSON.parse(JSON.stringify(link));
  //               link["count"] = list[index].count;
  //               link["last_visted_at"] = list[index].last_visted_at;
  //               return link;
  //             });

              
  //             return helpers.sendResponseSuccess(res, result);
  //           }
  //           return helpers.sendResponseSuccess(res, result);
  //         }

  //         return helpers.sendResponseSuccess(res, result);
  //       });
  //   } catch (error) {
  //     return helpers.sendResponseError(res, error.toString());
  //   }
  // },
     
  },
  updateorCreate: async function(link_id) {
    try {
      console.log("link_id", link_id);
      if (link_id) {
        var accessLink = await AcessLinkModel.findOne({ link_id });
        if (accessLink) {
          return AcessLinkModel.updateOne(
            { link_id: link_id },
            { count: accessLink.count + 1, last_visted_at: Date.now() }
          );
        } else {
          var accessModel = new AcessLinkModel({ link_id });
          return accessModel.save();
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }
};
