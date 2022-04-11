import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import AuthController from "../controllers/AuthController";

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(AuthController.loginForPassport));

export { passport };
