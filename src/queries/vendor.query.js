const { VendorModel } = require("../models/vendor.model");
const addVendor = async (body, session) => {
    try {
        const vendor = new VendorModel(body);
        return await vendor.save(session);
    } catch (error) {
        throw error;
    }
};
const listVendors = async (page = 1, pageSize = 8) => {
    try {
        const skip = (page - 1) * pageSize;
        return await VendorModel.find().skip(skip).limit(pageSize);
    } catch (error) {
        throw error;
    }
};
const editVendor = async (Id, updatedData) => {
    try {
        return await VendorModel.findByIdAndUpdate({ _id: Id }, updatedData, { new: true });
    } catch (error) {
        throw error;
    }
};
const deleteVendor = async (Id) => {
    try {
        return await VendorModel.findByIdAndDelete(Id);
    } catch (error) {
        throw error;
    }
};
const viewVendorById = async (Id) => {
    try {
        return await VendorModel.findById(Id);
    } catch (error) {
        throw error;
    }
};
const updateVendorStatus = async (Id, data) => {
    try {
        return await VendorModel.findByIdAndUpdate({ _id: Id }, { status: data });
    } catch (error) {
        throw error;
    }
}
const allStatusAcceptedVendor = async (page = 1, pageSize = 8) => {
    try {
        const skip = (page - 1) * pageSize;
        return await VendorModel.find({ status: 'accepted' }).skip(skip).limit(pageSize);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    addVendor,
    listVendors,
    editVendor,
    deleteVendor,
    viewVendorById,
    updateVendorStatus,
    allStatusAcceptedVendor
};
