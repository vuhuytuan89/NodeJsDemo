var express = require("express");
var app = express();

var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash    = require('connect-flash');

// set up our express application
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
var engine = require('ejs-locals');
app.engine('ejs', engine);

require('./configs/passport')(passport); // pass passport for configuration
// required for passport
app.use(session({ secret: 'xxxxxxxxxyyyyyyyzzzzzz' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// require router
var routerIndex = require("./routers/index")(app, passport);
var routerUser = require("./routers/user")(app);
var routerUser = require("./routers/post")(app);
// create server
var server = require("http").createServer(app);
server.listen(process.env.PORT || 3000, function() {
    var address = server.address().address;
    var port = server.address().port;
    console.log("Created Server: " + address + port);
})

//connect db mongoodb
var mongoose = require("mongoose");
var configDB = require('./configs/database.js');
mongoose.connect(configDB.url, {useMongoClient: true}).then(
  () => { console.log("Connect DB Mongoodb successfuly")},
  err => { console.log("Connection failed, Error:  ${err} ")}
);

app.use(function(req, res, next) {
  res.locals.query = req.query;
  res.locals.url   = req.originalUrl;
  next();
});