var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../../db');


module.exports = function(){
    passport.use(new LocalStrategy(
        function(username, password, done) {
          db.users.findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password != password) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
}