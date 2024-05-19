const mongoose = require("mongoose");
const shortid = require("shortid");

const VendorSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `VENDOR-${shortid.generate()}`,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true, 
    },
    companyName: {
        type: String,
        required: true,
    },
    companyAddress: {
        type: String,
        required: true,
    },
    services: {
        type: [String],
        required: true,
    },
    serviceLocations: {
        type: [String],
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    aboutVendor: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
    },
    created: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'rejected'],
        default: 'accepted',
        required: true,
    }
});

const VendorModel = mongoose.model('Vendor', VendorSchema);
module.exports = {
    VendorModel
};
