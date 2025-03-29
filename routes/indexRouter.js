const indexController = require('../controllers/indexController')
const { Router } = require('express');
const indexRouter = Router();

indexRouter.get("/", indexController.indexPageGet);
indexRouter.get("/signup", indexController.signupGet);
indexRouter.get("/login", indexController.loginGet);
indexRouter.post("/signup/new-user", indexController.signupPost);

module.exports = indexRouter;