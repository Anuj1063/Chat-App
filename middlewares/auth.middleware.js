const passport = require("passport");
const passportJWT = require("passport-jwt");
const mongoose = require('mongoose');
const users = require('../models/user.model');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token; // use your cookie name here
  }
  return token;
};

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromHeader('x-access-token'),
    ExtractJwt.fromHeader('token'),
    cookieExtractor // ✅ Add cookie support here
  ])
};


module.exports = () => {
  const strategy = new JwtStrategy(params, async (payload, done) => {
    try {
      const user = await users.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(payload.userId), // FIXED
            isDeleted: false
          }
        }
      ]).exec();

      if (user.length > 0) {
        return done(null, user[0]);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),

    authenticate: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => { // FIXED
        if (err) {
          console.error("Auth error:", err);
          return next(err);
        }

        if (!user) {
          req.flash("error", "Please log in again.");
          return res.redirect('/login-form');
        }

        req.user = user;
        next();
      })(req, res, next);
    },

    authenticateAPI: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: 'Token validation failed or expired.'
          });
        }

        if (!user) {
          return res.status(401).json({
            status: 401,
            message: 'Unauthorized: User not found.'
          });
        }

        req.user = user;
        next();
      })(req, res, next);
    }
  };
};
