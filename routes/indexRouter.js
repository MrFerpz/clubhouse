const indexController = require('../controllers/indexController')
const { Router } = require('express');
const indexRouter = Router();
const passport = require('passport');

indexRouter.get("/", indexController.indexPageGet);
indexRouter.get("/signup", indexController.signupGet);
indexRouter.get("/login", indexController.loginGet);
indexRouter.post("/login", passport.authenticate("local", 
    { successRedirect: "/login-success", failureRedirect: "/login-failure" }));
indexRouter.post("/signup/new-user", indexController.signupPost);
indexRouter.get("/signup-success", indexController.signupSuccessGet);
indexRouter.get("/login-failure", indexController.loginFailureGet);
indexRouter.get("/login-success", indexController.loginSuccessGet);
indexRouter.get("/signup-failure", indexController.signupFailureGet);

module.exports = indexRouter;