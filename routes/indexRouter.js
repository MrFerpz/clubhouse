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
indexRouter.get("/join", indexController.joinPageGet);
indexRouter.post("/join", indexController.joinPagePost);
indexRouter.get("/join-failure", indexController.joinFailureGet);
indexRouter.get("/message-board", indexController.messageBoardGet);
indexRouter.post("/add-message", indexController.newMessagePost);
indexRouter.get("/add-message", indexController.newMessageGet);
indexRouter.get("/admin-signup", indexController.adminSignupGet);
indexRouter.post("/admin-signup", indexController.adminSignupPost);
indexRouter.post("/message-board/delete-post/:messageID", indexController.messageDeletePost);

module.exports = indexRouter;