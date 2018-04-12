var passportConfig = function (app) {
    var passport = require('passport');
    var session = require('express-session');
    require('./strategies/google')();
    require('./strategies/twitter')();
    require('./strategies/facebook')();
    require('./strategies/facebook')();
    require('./strategies/local')();
    var db = require('../db');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
    app.use(session({ secret: 'anything' }));
    app.use(passport.initialize());
    app.use(passport.session());
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function (user, done) {
        //put the user in the session
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        //pull user back out of the session.
        db.users.findById(id, function (err, user) {
            if (err)  return done(new Error('Could not find user with id:'+id));
            done(null, user);
          });
    });
}
module.exports = passportConfig;