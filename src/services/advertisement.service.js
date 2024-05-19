const advertisementQuery = require("../queries/advertisement.query");
const customException = require("../../commons/exception/customException");

const addAdvertisement = async (body, session) => {
    try {
        return await advertisementQuery.addAdvertisement(body, session);
    } catch (error) {
        throw error;
    }
};
const listadvertisemnet = async (page, pageSize) => {
    try {
        const advertisement = await advertisementQuery.listadvertisemnet(page, pageSize);
        if (!advertisement || advertisement.length === 0) {
            throw customException.error(
                statuscode.NOT_FOUND,
                null,
                "No advertisement found."
            );
        }
        return advertisement;
    } catch (error) {
        throw error;
    }
};
const editAdvertisement = async (Id, updatedData) => {
    try {
        return await advertisementQuery.editAdvertisement(Id, updatedData);
    } catch (error) {
        throw error;
    }
};
const deleteAdvertisement = async (Id) => {
    try {
        return await advertisementQuery.deleteAdvertisement(Id);
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