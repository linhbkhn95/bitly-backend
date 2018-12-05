const express = require("express");
const router = express.Router();
const linkController = require("../controllers/link-controller");
const accessLinkController = require("../controllers/accessLink-controller");
const helpers = require("../helpers/helpers");
const linkRepo = require("../repositories/link-repo");
const notificationController = require("../controllers/notification-controller");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/subscribe",notificationController.subscribe);

router.get('/getFullLink/:short_link',linkController.getFullLink)
router.post("/generate", linkController.generateShortLink);
router.get("/getTopLink",linkController.getTopLink);
// router.get("/getTopLink", accessLinkController.getTopLink);
module.exports = router;
