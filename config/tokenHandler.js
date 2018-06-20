const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt'); 
const secret = 'server secret';
 

var handler = {
    serialize: function (req, res, next) {
        next();
    },

    generateToken: function (req, res, next) {
        req.token = jwt.sign({
            data: {
                id: req.user._id,
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, secret);
        next();
    },

    respond: function (req, res) {
        res.status(200).json({
            status:"OK",
            user: req.user,
            token: req.token
        });
    },
    authenticate : expressJwt({secret : secret})

}

module.exports = handler;