var passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;

module.exports = function(){
    passport.use(new facebookStrategy({
    clientID:'411964112550645',
    clientSecret:'384165fd8a0e9f9ebbc86c34ab4dc347',
    callbackURL:'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback: true},
    function(req, accessToken, refreshToken, profile, done){
        var user = {};
        user.email = profile.emails[0].value;
        user.image = profile.photos[0].value;
        user.displayName = profile.displayName;

        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;

        done(null, user);
        }
    ));
}