const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "393118043039-jp8mb21mc4p5ldmrjpcr2ccseakfrcqc.apps.googleusercontent.com",
    clientSecret: "eT1WiKc33qVKnXWFX9juHf_G",
    callbackURL: "http://localhost:3000/index"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));