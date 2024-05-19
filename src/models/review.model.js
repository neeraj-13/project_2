const mongoose = require("mongoose");
const shortid = require("shortid");

const ReviewSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `REVIEW-${shortid.generate()}`
    },
    vendorId:{
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 0
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    review: {
        type: String,
    }
});

const ReviewModel = mongoose.model('Review', ReviewSchema);
module.exports = { ReviewModel };