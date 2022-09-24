var GoogleStrategy = require("passport-google-oauth2").Strategy;
const Register = require("../model/register");
const passport = require("passport");

// const bcrypt = require('bcryptjs')

const GOOGLE_CLIENT_ID ="1040427927431-5h2o3goj5aobhi2ushltddvoaphjnc1t.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://bill-fixers.herokuapp.com/google/callback",
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const tasks = await Register.findOne({ email: profile.email });
      if (!tasks) {
        const body = new Register({
          email: profile.email,
          username: profile.displayName,
          password: profile.id,
          firstname: profile.given_name,
          lastname: profile.family_name,
        });

        const registerUser = await Register.create(body);
        
        return done(null, true, {
          userid: registerUser["_id"],
          email: registerUser["email"],
          firstname: registerUser["firstname"],
          lastname: registerUser["lastname"],
        });

        // return done(null, profile);
      } else {
        return done(null, true, {
          userid: tasks["_id"],
          email: tasks["email"],
          firstname: tasks["firstname"],
          lastname: tasks["lastname"],
        });
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
