const serviceQuery = require("../queries/service.query");
const addService = async (body, session) => {
  try {
    return await serviceQuery.addService(body, session);
  } catch (error) {
      throw error;
  }
};
const viewServices = async (page, pageSize) => {
  try {
    const service = await serviceQuery.viewServices(page, pageSize);
    if (!service || service.length === 0) {
      return "No service found.";
    }
    return service;
  } catch (error) {
    throw error;
  }
};
const editService = async (Id, updatedData) => {
  try {
    return await serviceQuery.editService(Id, updatedData);
  } catch (error) {
    throw error;
  }
};
const deleteService = async (Id) => {
  try {
    return await  serviceQuery.deleteService(Id);
  } catch (error) {
    throw error;
  }
};
const viewServiceById = async (Id) => {
    try {
      const service = await serviceQuery.viewServiceById( Id );
      if (!service) {
        return "service not found.";
      }
      return service;
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