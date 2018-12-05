const helpers = require("../helpers/helpers");
const constants = require("../constants/constants");
const linkRepo = require("../repositories/link-repo");
const SubModel = require("../models/subs");
const webpush = require("web-push");

const vapidKeys = webpush.generateVAPIDKeys();

const publicVapidKey =
  "BCd-NNalv04tT2HKYxWcv4nqEd2jUeW173il04IjQXRu_H6XTQ_7tz9ovPDfAandOeVHj6hyeZqqQBSooqtlJoo";
const privateVapidKey = "HqOgaDcK79ljBAXMgG2v-K5kuE57zV9AoKWohjYu9iM";

console.log("publicVapidKey", publicVapidKey, privateVapidKey);
// Replace with your email
webpush.setVapidDetails(
  "mailto:trinhducbaolinh@gmail.com",
  publicVapidKey,
  privateVapidKey
);

exports.subscribe = async (req, res) => {
  // console.log("subscribe", req.body);
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "test" });
  SubModel.findOne({ auth: subscription.keys.auth })
    .then(sub => {
      if (sub) {
        // helpers.sendResponseSuccess(res,)
        return;
      } else {
        linkRepo.addSub(subscription.keys.auth, subscription).then(sub => {
          helpers.subscriptionNotify(subscription);
          webpush.sendNotification(subscription, payload).catch(error => {
            console.error(error.stack);
          });
        });
      }
    })
    .catch(error => {});
};
exports.pushnotfi = async dataAcessLink => {
  try {
    dataAcessLink.title = "New link is generated";
    const sublist = await SubModel.find();
    console.log("datacccc", dataAcessLink);
    Promise.all(
      sublist.map(sub => {
        return new Promise((resolve, reject) => {
          helpers.pushNotify(sub.subObject, dataAcessLink);
        });
      })
    );
  } catch (error) {
    console.log("pushnotfi we==errr", error);
  }
};
