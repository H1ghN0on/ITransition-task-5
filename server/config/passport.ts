import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import AuthController from "../controllers/AuthController";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user });
  });
});

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload);
  })
);

passport.deserializeUser(function (user: string, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(AuthController.loginForPassport));

export { passport };
