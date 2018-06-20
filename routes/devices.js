var express = require('express');
var tokenizer = require('../config/tokenHandler');
var router = express.Router();


/* GET home page. */
router.post('/verify',tokenizer.authenticate,function(req, res) {
  console.log(req.body.deviceId);
});



module.exports = router;