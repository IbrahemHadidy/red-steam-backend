import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import secret from '../configs/jwt';

// Define options for the JWT strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

// Create a new JWT strategy
const jwtStrategy = new Strategy(options, (payload, done) => {
  User.findById(payload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((error) => done(error, false));
});

// Register the strategy with Passport
passport.use(jwtStrategy);

export default passport;
