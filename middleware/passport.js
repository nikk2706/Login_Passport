const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;   
const ExtractJWT = require('passport-jwt').ExtractJwt;
const checkuserexist = require('../Services/services');
const secretkey = 'secretkey';
const bcrypt = require('bcrypt');

const USER = require('../models/user-model');

const localStratagyOpts = { usernameField: 'username', passwordField: 'password' };
const jwtStrategyOpts = { jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey: secretkey };

const loginLocalStrategy = new localStrategy(localStratagyOpts, async (username, password, done) => {
    try {
        const user = await checkuserexist(username);
        if (!user) {
            return done(null, false, { message: 'User not Exist' });
        }

        const passwd = await bcrypt.compare(password, user.password);
        if (!passwd) {
            return done(null, false, { message: 'Invalid Credentials' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

const authenticateJwtStrategy = async (jwtPayload, done) => {
    try {
        console.log('authenticateJwtStrategy called');
        console.log("=======jwtPayload==== :: \n", jwtPayload);
        let user = await USER
        .findOne({ _id: jwtPayload.useId });
        console.log("=====user==== :: \n", user);
        // .populate({select: 'name' });
      if (user) { return done(null, user); }
      else { return done('Invalid access token'); }
    } catch (error) { done(error); }
  };
passport.use('login', new localStrategy(localStratagyOpts, loginLocalStrategy));
passport.use('authentication', new JWTstrategy(jwtStrategyOpts, authenticateJwtStrategy));




