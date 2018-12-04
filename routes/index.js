const express = require('express');
const router = express.Router();
const linkController = require('../controllers/link-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/generate', linkController.generateShortLink);

module.exports = router;
