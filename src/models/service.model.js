const mongoose = require("mongoose");
const shortid = require("shortid");
const ServiceSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `SERVICE-${shortid.generate()}`,
    },
    service: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
        required: true,
    },
});
const ServiceModel = mongoose.model('Service', ServiceSchema);
module.exports = {
    ServiceModel
};