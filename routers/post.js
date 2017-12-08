const postsController = require('../controllers/posts');
// used for uploading files
var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })
// path upload

var storage = multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})
var upload = multer({ storage: storage});

module.exports = function(app) {  
    app.get('/post/list', postsController.getList);
    app.get('/post/add', postsController.getAdd);
    app.post("/post/process", upload.single('file'), postsController.postAdd);
}
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/login');
}