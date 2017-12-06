var Post = require("../models/post");

module.exports = function(app) {
    app.get("/", function(req, res) {
       
        Post.find(function (err, data) {
            if (err) return console.log(err);
            res.render('pages/home', { title: 'Express', posts: data });
        });
        /*
        Post.find({}).exec(function(err, posts) {
            if (err) {
              res.send(err);
            }
            else {
              res.json(posts);
            }
        });
        */


    })
    app.get("/about", function(req, res) {
        res.render('pages/about', { title: "about"});
    })
    app.get("/contact", function(req, res) {
        res.render('pages/contact', { title: "contact"});
    })  
    app.get("/new/:id", function(req, res) {
        Post.findById(req.params.id).exec(function(err, post) {
            if (err) {
              res.send(err);
            }
            else {
              res.render('pages/new_detail', { title: "new detail" , posts: post});
            }
        });
       
    })
    
    app.get("/login", function(req, res) {
        res.render("pages/login", { title: "login" })
    })      
}