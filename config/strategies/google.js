var passport = require('passport');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(){
    passport.use(new googleStrategy({
    clientID:'913934598200-uauosvmjsncfvgbb58bs9c3b0itsd2oc.apps.googleusercontent.com',
    clientSecret:'i9u3jtklYjmxhibSyh3JGTpF',
    callbackURL:'https://mqtt-heroku.herokuapp.com/auth/google/callback'},
    function(req, accessToken, refreshToken, profile, done){
        var user = {};
        user.email = profile.emails[0].value;
        user.image = profile._json.image.url;
        user.displayName = profile.displayName;

        user.google = {};
        user.google.id = profile.id;
        user.google.token = accessToken;

        done(null, user);
        }
    ));
}
