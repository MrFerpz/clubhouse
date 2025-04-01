const { name } = require('ejs');
const db = require('../db/pool');
const bcrypt = require ('bcryptjs');

function indexPageGet(req, res) {
    res.render("index", {user: req.user});
}

function signupGet(req, res) {
    res.render("signup")
}

function loginGet(req, res) {
    res.render("login")
}

async function getUser(email) {
    const response = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    console.log(response.rows);
    return response.rows[0];
}

function signupSuccessGet(req, res) {
    res.render("signup-success");
}

function signupFailureGet(req, res) {
    res.render("signup-failure");
}

async function signupPost (req, res, next) {
    const checkIfEmailExists = await db.query("SELECT * FROM users WHERE email = $1", [req.body.email]);

    if (checkIfEmailExists.rows.length >= 1) {
        res.render("signup-failure", {message: "Signup unsuccessful as this email already exists."});
        return
    }

    // if no dupe email we move on -
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    try {
        await db.query("INSERT INTO users (first_name, last_name, email, password, is_member) VALUES ($1, $2, $3, $4, $5)", [req.body.firstname, req.body.lastname, req.body.email, hashPassword, false]);
        res.render("signup-success", {message: "Successfully signed up with: " + req.body.email})
    } catch(error) {
        console.log(error);
        res.render("signup-failure", {message: error});
    }
}

async function verifyPassword(email, password, done) {
    try {
    const user = await getUser(email);
    const match = await bcrypt.compare(password, user.password);
        if (!user) {
            console.log("user does not exist")
            return done(null, false, {message: "User does not exist."}) 
        };
        if (!match) {
            console.log("incorrect pass")
            return done(null, false, {message: "Incorrect password."})
        }
        console.log(user);
        return done(null, user);
    } catch(err) {
        return done(err);
    }
}

function loginFailureGet(req, res) {
    res.render("login-failure")
}

function loginSuccessGet(req, res) {
    res.render("login-success")
}

function joinPageGet(req, res) {
    res.render("join")
}

async function joinPagePost(req, res) {
    console.log(req.user.id);
    if (req.body.secretpassword !== "secret") {
        res.render("join-failure");
        return
    }
    await db.query("UPDATE users SET is_member = true WHERE id = $1", [req.user.id]);
    console.log("successfully joined the club!");
    res.render("message-board", {user: req.user});
}

function joinFailureGet(req, res) {
    res.render("join-failure")
}

async function messageBoardGet(req, res) {
    const response = await db.query("SELECT * FROM messages");
    const messageList = response.rows;
    res.render("message-board", {user: req.user, messages: messageList})
}

async function newMessagePost(req, res) {
    const time = Date.now();
    const message = req.body.message;
    const firstname = req.user.first_name;
    await db.query("INSERT INTO messages (user_id, message, time, first_name) VALUES ($1, $2, (to_timestamp($3 / 1000.0)), $4)", [req.user.id, message, time, firstname])
    console.log("message logged");
    const response = await db.query("SELECT * FROM messages");
    const messageList = response.rows;
    res.render("message-board", {user: req.user, messages: messageList})
}

function newMessageGet(req, res) {
    res.render("add-message");
}

function adminSignupGet(req, res) {
    res.render("admin-signup");
}

async function adminSignupPost(req, res) {
    if (req.body.adminpassword === "adminpassword") {
        const message = "You are now an admin.";
        await db.query("UPDATE users SET is_admin = true WHERE id = $1", [req.user.id]);
        console.log("successfully made " + req.user.first_name + " an admin.");
        res.render("index", {message: message})
        } else {
        const message = "You entered the wrong admin password."
        res.render("index", {message: message})
    }
}

async function messageDeletePost(req, res) {
    const messageID = req.params.messageID;
    await db.query ("DELETE FROM messages WHERE id = $1", [messageID]);
    const messageList = await db.query("SELECT * FROM messages");
    res.render("message-board", {user: req.user, messages: messageList})
}

module.exports =  { 
    indexPageGet,
    signupGet,
    loginGet,
    getUser,
    signupPost,
    signupSuccessGet,
    verifyPassword,
    loginFailureGet,
    loginSuccessGet,
    signupFailureGet,
    joinPageGet,
    joinPagePost,
    joinFailureGet,
    messageBoardGet,
    newMessagePost,
    newMessageGet,
    adminSignupGet,
    adminSignupPost,
    messageDeletePost
};