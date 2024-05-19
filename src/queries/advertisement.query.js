const { AdvertisementModel } = require("../models/advertisement.model");
const addAdvertisement = async (body, session) => {
    try {
        const advertisement = new AdvertisementModel(body);
        return await advertisement.save(session);
    } catch (error) {
        throw error;
    }
};
const listadvertisemnet = async (page = 1, pageSize = 8) => {
    try {
        const skip = (page - 1) * pageSize;
        return await AdvertisementModel.find().skip(skip).limit(pageSize);
    } catch (error) {
        throw error;
    }
};
const editAdvertisement = async (Id, updatedData) => {
    try {
        return await AdvertisementModel.findByIdAndUpdate({ _id: Id }, updatedData, { new: true });
    } catch (error) {
        throw error;
    }
};
const deleteAdvertisement = async (Id) => {
    try {
        return await AdvertisementModel.findByIdAndDelete(Id);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    addAdvertisement,
    listadvertisemnet,
    editAdvertisement,
    deleteAdvertisement
};