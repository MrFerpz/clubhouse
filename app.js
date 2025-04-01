require('dotenv').config();
const path = require('node:path');
const express =  require('express');
const session = require('express-session')
const app = express();
const passport = require('passport');
const indexRouter = require('./routes/indexRouter')
const LocalStrategy = require('passport-local');
const indexController = require('./controllers/indexController');
const { verify } = require('node:crypto');
const db = require('./db/pool');

// for reading POST forms (parsing req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// set views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set css / other static asset directory
app.use('/static', express.static('public'))

// passport set-up

// this is the SID cookie that allows us to stay logged in and remember it for one day
app.use(session(
    {secret: "secret words!!",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 24 * 1000}}
))

// make sure passport uses sessions (necessary for logging in)
app.use(passport.session());

// we are using email to login, and the localStrategy callback expects a username, so we need customFields
const customFields = {
    usernameField: "email",
    passwordField: "password"
}

// defining strategy with our custom verifyPassword check
const strategy = new LocalStrategy(customFields, indexController.verifyPassword);
passport.use(strategy);

// passport sessions functions (from docs, fine to copy paste, don't need to call them)
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
} catch(err) {
    done(err);
}
});

// let them log-out as well. passport has .logout() built in
app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

// set-up router on initial load
app.use("/", indexRouter);

app.listen(3000);
console.log('Your server available at http://localhost:3000');


