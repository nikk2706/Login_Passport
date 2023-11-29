const passport = require('passport');

const handleJWT = (req, res, next) => async (err, user, info) => {
    try {
        console.log("in handleJWT=========");
        if (err || info || !user) {
            const error = err || info.message;
            throw { status: 401, message: error };
        }
        req.user = user;
        return next();
    } catch (err) {
        next(err);
    }
};

exports.isAuth = (req, res, next) => {
    console.log("======innnnn");
    passport.authenticate('authentication', { session: false }, handleJWT(req, res, next))(req, res, next);
};

