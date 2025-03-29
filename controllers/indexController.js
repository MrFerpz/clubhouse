const db = require('../db/queries');

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

module.exports =  { 
    indexPageGet,
    signupGet,
    loginGet,
    getUser };