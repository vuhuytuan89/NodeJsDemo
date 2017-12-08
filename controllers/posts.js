'use strict';
const Post = require("../models/post");
module.exports = {
    
    getList(req, res) {
        var datas = Post.find(function (err, data) {
            if (err) return console.log(err);
            res.render("posts/post_list", {
                title: "list post",
                user : req.user,
                posts: data
            })
        });
    },
    
    getAdd(req, res) {
        res.render("posts/post_add", {
            title: "list post",
            user : req.user
        })
    },
    postAdd(req, res) {
        //console.log(req.file.filename);
        //res.send("upload file thanh cong");
        return Post.create({
            title : req.body.title,
            description : req.body.description,
            image_path: req.file.filename
        })
        .then(Post => 
            //res.status(201).send(Post)
            res.redirect("/post/list")
        )
        .catch(err => res.status(400).send(err));
        
    }
}