var express = require('express');
var router = express.Router();

var mqtt = require('../mqtt/test');
var mqttServer =   mqtt;

/* GET users listing. */
router.post('/sendMsg', function(req, res, next) {
    console.log(req.body);
   if(req.body){
    mqttServer.sendMsg(req.body.topic, req.body.msg);
   }
   res.sendStatus(200);
});

module.exports = router;