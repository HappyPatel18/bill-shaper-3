var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const Register = require('./model/register');
const passport = require('passport')
// const bcrypt = require('bcryptjs')

const GOOGLE_CLIENT_ID = '1040427927431-5h2o3goj5aobhi2ushltddvoaphjnc1t.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://bill-shaper-18.herokuapp.com/google/callback",
    passReqToCallback   : true
  },
 async function(req, accessToken, refreshToken, profile, done) {
        const tasks = await Register.findOne({email:profile.email});
        if(!tasks){

            // const body = new Register ({
            //     email : profile.email,
            //     username : profile.displayName,
            //     password : profile.id
            // })

            // const registerUser = await Register.create(body);
            // session=req.session;
            // session.userId = registerUser['_id'];
            // console.log("User Logged In")
            // console.log(session)
            // return done(null, profile);

        }
        else{
            // session=req.session;
            // session.userId = tasks['_id'];
            // console.log("User Logged Out")
            // console.log(session)
            // return done(null, profile);

        }



  }
));


passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
});