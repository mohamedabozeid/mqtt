var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(){
    passport.use(new TwitterStrategy({
        consumerKey:'ArAEuQcXXnKvCfwDbVZlpi1ID',
        consumerSecret:'2F71ZNdSQfN4F6IIkHd0YB2NYWg5sqGaKJXviemMchdTgTfAqX',
        callbackURL:'https://mqtt-heroku.herokuapp.com/auth/twitter/callback',
        passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done){
        var user = {};
        //user.email = profile.emails[0].value;
        if(profile._json.image)
        user.image = profile._json.image.url;
        user.displayName = profile.displayName;

        user.twitter = {};
        user.twitter.id = profile.id;
        user.twitter.token = token;

        done(null, user);
    }
))
}