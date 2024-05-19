const { ServiceModel } = require("../models/service.model");
const addService = async (body, session) => {
    try {
        const service = new ServiceModel(body);
        return await service.save(session);
    } catch (error) {
        throw error;
    }
};
const viewServices = async (page = 1, pageSize = 8) => {
    try {
        const skip = (page - 1) * pageSize;
        return await ServiceModel.find().skip(skip).limit(pageSize);
    } catch (error) {
        throw error;
    }
};
const editService = async (Id, updatedData) => {
    try {
        return  await ServiceModel.findByIdAndUpdate({ _id: Id }, updatedData, { new: true });
    } catch (error) {
        throw error;
    }
};
const deleteService = async (Id) => {
    try {
        return await ServiceModel.findByIdAndDelete(Id);
    } catch (error) {
        throw error;
    }
};
const viewServiceById = async (Id) => {
    try {
        return await ServiceModel.findOne({ _id: Id });
    } catch (error) {
        throw error;
    }
};
module.exports = {
    addService,
    viewServices,
    editService,
    deleteService,
    viewServiceById,
};
