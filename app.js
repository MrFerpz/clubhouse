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

// send to router on initial load
app.use("/", indexRouter);

// set views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

async function verifyPassword(email, password, done) {
    const user = await indexController.getUser(email);
        if (!user) { return done(null, false, {message: "Username does not exist."}) };
        if (user.password === password) {
            console.log("it's a match!")
        }
        console.log(user);
    // query DB to see if there is a user that matches the username
    // if no, tell the user that name does not exist and return done(err)

    // if yes, use bcrypt & check if the passwords match
    // if they don't match, tell the user incorrect password

    // if they do match, return done(null, user)
}

// const strategy = new LocalStrategy(verifyPassword);

// passport.use(strategy)

app.listen(3000);
console.log('Your server available at http://localhost:3000');


