var Post = require("../models/post");

module.exports = function(app) {
    app.get("/", function(req, res) {
        Post.find(function (err, data) {
            if (err) return console.error(err);
            console.log(data);
            res.render('pages/home', { title: 'Express', posts: data });
        });
    })
    app.get("/about", function(req, res) {
        res.render('pages/about', { title: "about"});
    })
    app.get("/contact", function(req, res) {
        res.render('pages/contact', { title: "contact"});
    })  
    app.get("/new/:id", function(req, res) {
        var data = Post.find({ 
            "_id": new ObjectID("5a2675f2ef9f8d25e0d1aec6")
        });
        res.render('pages/new_detail', { title: "new detail", data: data});
    })      
}