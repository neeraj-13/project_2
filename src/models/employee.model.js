const mongoose = require("mongoose");
const shortid = require("shortid");
const empSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `EMP-${shortid.generate()}`
    },
    fullName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    remark: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active"
    }
},
    {
        timestamps:
        {
            createdAt: 'createdOn',
            updatedAt: 'updatedOn'
        }
    }
);
const EmpManagementModel = mongoose.model("Employee", empSchema);
module.exports = { EmpManagementModel };