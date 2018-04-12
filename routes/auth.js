
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/users/',
        failure: '/error/'
    }));

router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

router.route('/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect: '/users/',
        failure: '/error/'
    }));

router.route('/twitter')
    .get(passport.authenticate('twitter'));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/users/',
        failure: '/error/'
    }));

router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ['email']
    }));

router.route('/login').post(
    passport.authenticate('local'),
    function(req, res) {
      return  res.send({
          status: "OK",
          user: req.user
      });
    });

router.route('/profile').get( function(req, res, next){
    if(!req.user) return res.sendStatus(401);
    return res.send(req.user);
});

module.exports = router;