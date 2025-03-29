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

// for reading forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// send to router on initial load
app.use("/", indexRouter);

// set views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// async function verifyPassword(email, password, done) {
//     try {
//     const user = await indexController.getUser(email);
//         if (!user) {
//             return done(null, false, {message: "Username does not exist."}) 
//         };
//         if (user.password !== password) {
//             return done(null, false, {message: "Incorrect password."})
//         }
//         console.log(user);
//         return done(null, user);
//     } catch(err) {
//         return done(err);
//     }
// }

// const strategy = new LocalStrategy(verifyPassword);
// passport.use(strategy);

app.listen(3000);
console.log('Your server available at http://localhost:3000');


