var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next){
  if(!req.user){
    res.redirect('/');
    return;
  }
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.render('users', {user: {
    name: req.user.displayName, 
    image: req.user.image
  }});
});

module.exports = router;
