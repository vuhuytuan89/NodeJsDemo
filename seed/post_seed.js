
var Post = require("../models/post")
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog", { useMongoClient: true});
var datas = [
    new Post({
        title: "Title 1",
        description: "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
        image_path: "http://genknews.genkcdn.vn/thumb_w/660/2017/photo-0-1512435699888.jpg"
    }),
    new Post({
        title: "Title 2",
        description: "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
        image_path: "http://genknews.genkcdn.vn/thumb_w/660/2017/photo-0-1512356412184.jpg"
    }),
    new Post({
        title: "Title 3",
        description: "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
        image_path: "https://genknews.genkcdn.vn/zoom/222_289/2017/photo1512435629352-1512435629352.jpeg"
    })
];

var done = 0;
for (var i = 0; i < datas.length; i++) {
    datas[i].save(function(err, result) {
        done ++;
        if (done === datas.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}