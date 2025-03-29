const db = require('../db/pool');
const bcrypt = require ('bcryptjs');

function indexPageGet(req, res) {
    res.render("index");
}

function signupGet(req, res) {
    res.render("signup")
}

function loginGet(req, res) {
    res.render("login")
}

function getUser(email) {
    return db.getUser(email)
}

async function signupPost (req, res, next) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    try {
        await db.query("INSERT INTO users (first_name, last_name, email, password, is_member) VALUES ($1, $2, $3, $4, $5)", [req.body.firstname, req.body.lastname, req.body.email, hashPassword, false]);
        res.redirect("/signup-success")
    } catch(error) {
        console.log(error);
        // next(error);
    }
    res.redirect("/")
}

module.exports =  { 
    indexPageGet,
    signupGet,
    loginGet,
    getUser,
    signupPost
};