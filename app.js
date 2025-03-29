require('dotenv').config();
const path = require('node:path');
const express =  require('express');
const session = require('express-session')
const app = express();
const indexRouter = require('./routes/indexRouter')

// send to router on initial load
app.use("/", indexRouter);

// set views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(3000);
console.log("Listening on port 3000!");
