module.exports = function(app) {  
    app.get('/post/list', function (req, res) {
        res.render("posts/list_post", {
            title: "list post"
        })
    })
}