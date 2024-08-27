import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Define the User type
type User = {
  id: string;
  displayName: string;
  emails: { value: string }[];
};

const app = express();

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and configure it to use sessions
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile: Profile, done) => {
      // Here you can implement logic to store or retrieve user information from the database
      // For now, just return the user profile
      return done(null, profile);
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  // In a real application, you might use user.id to identify users
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

// Define route to start the Google OAuth flow
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Define callback route that Google redirects to after successful authentication
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Define a home route
app.get('/', (req, res) => {
  res.send('Hello, LeatherBound! You are logged in!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});