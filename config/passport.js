var passportConfig = function(app){
    var passport = require('passport');
    var session = require('express-session');
    require('./strategies/google')();


    app.use(session({secret: 'anything'}));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
    //put the user in the session
    done(null, user);
    }); 
    passport.deserializeUser(function(user, done){
    //pull user back out of the session.
    done(null, user);
    });
}
module.exports = passportConfig;