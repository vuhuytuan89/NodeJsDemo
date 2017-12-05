var express = require("express");
var app = express();

// setup view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

var engine = require('ejs-locals');
app.engine('ejs', engine);

var routerIndex = require("./routers/index")(app);
var routerUser = require("./routers/user")(app);
// create server
var server = require("http").createServer(app);
server.listen(3000, function() {
    var address = server.address().address;
    var port = server.address().port;
    console.log("Created Server: " + address + port);
})

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog", { useMongoClient:true })

