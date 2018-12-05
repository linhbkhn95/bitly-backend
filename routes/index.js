const express = require('express');
const router = express.Router();
const linkController = require('../controllers/link-controller');
const accessLinkController = require('../controllers/accessLink-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/generate', linkController.generateShortLink);
router.get('/getTopLink', accessLinkController.getTopLink);

module.exports = router;
