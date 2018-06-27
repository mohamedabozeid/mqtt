var express = require('express');
var tokenizer = require('../config/tokenHandler');
var router = express.Router();
var deviceSrv = require('../services/devices-service');



/* GET home page. */
router.post('/verify', tokenizer.authenticate, function (req, res) {
  console.log(req.body.deviceId);
  if (req.body.deviceId) {
    deviceSrv.verify(req.user.data.id, req.body.deviceId, device => {
      res.send(device);
    }, error => {
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(400);
  }
});

router.get('/userDevices', tokenizer.authenticate, function (req, res) {
  console.log(req.user.data.id);
  if (req.user.data.id) {
    deviceSrv.getUserDevices(req.user.data.id, devices => {
      res.send(devices);
    }, error => {
      return res.sendStatus(404);
    });
  }
});

router.post('/save', tokenizer.authenticate, function (req, res) {
  console.log(req.body);
  deviceSrv.save(req.body, device => {
    res.send(device);
  }, error => {
    throw error;
  })
});





module.exports = router;