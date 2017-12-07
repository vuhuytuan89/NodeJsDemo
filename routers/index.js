var Post = require("../models/post");

module.exports = function(app, passport) {
    app.get("/", function(req, res) {
       
        Post.find(function (err, data) {
            if (err) return console.log(err);
            res.render('pages/home', { 
                title: 'Express', 
                posts: data
             });
        });
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
    
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        var datas = {
            title: "login",
            message: req.flash('loginMessage') 
        }
        res.render('pages/login', datas); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        var datas = {
            title: "login",
            message: req.flash('signupMessage') 
        }
        // render the page and pass in any flash data if it exists
        res.render('pages/signup', datas); 
    });
    
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('pages/profile', {
            title: "Profile",
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}