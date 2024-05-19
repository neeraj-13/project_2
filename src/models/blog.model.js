const mongoose = require("mongoose");
const shortid = require("shortid");

const BlogSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `Blog-${shortid.generate()}`,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
    },
    published: {
        type: Boolean,
        default: false,
    },
    author: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: { 
        type: Date,
        default: Date.now,
        required: true,
    }
});

const BlogModel = mongoose.model('Blog', BlogSchema); 
module.exports = {
    BlogModel,
}
