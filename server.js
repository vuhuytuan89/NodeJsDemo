var express = require("express");
var app = express();

// setup view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

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

var options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog", options).then(
  () => { console.log("Connect DB Mongoodb successfuly")},
  err => { console.log("Connection failed, Error:  ${err} ")}
);

