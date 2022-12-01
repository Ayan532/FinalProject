const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
 const GithubStrategy = require("passport-github2").Strategy;


const GOOGLE_CLIENT_ID = "556623808225-h723kkeg6kuf7i422jdu3n99otddgqaa.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "b5c714bf0fb5a31e4dbb";
GITHUB_CLIENT_SECRET = "3cee977dc15603cb6b1b0d50dd41131fbdfb6267";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});