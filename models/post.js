var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image_path: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now 
    },
});

module.exports = mongoose.model("Post", Schema);