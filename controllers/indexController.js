function indexPageGet(req, res) {
    res.render("index");
}

function signupGet(req, res) {
    res.render("signup")
}

function loginGet(req, res) {
    res.render("login")
}

module.exports =  { 
    indexPageGet,
    signupGet,
    loginGet };