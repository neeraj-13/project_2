const vendorQuery = require("../queries/vendor.query");
const customException = require("../../commons/exception/customException");
const addVendor = async (body) => {
  try {
    console.log(body);
    return await vendorQuery.addVendor(body);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const listVendors = async () => {
  try {
    const vendors = await vendorQuery.listVendors();
    if (!vendors || vendors.length === 0) {
      throw customException.error(
        statusCode.NOT_FOUND,
        null,
        "vendor not found"
      );
    }
    return vendors;
  } catch (error) {
    throw error;
  }
};
const editVendor = async (Id, updatedData) => {
  try {
    const result = await vendorQuery.editVendor(Id, updatedData);
    return result;
  } catch (error) {
    throw error;
  }
};
const deleteVendor = async (Id) => {
  try {
    const result = await vendorQuery.deleteVendor(Id);
    return result;
  } catch (error) {
    throw error;
  }
};
const viewVendorById = async (Id) => {
  try {
    const vendor = await vendorQuery.viewVendorById(Id);
    if (!vendor) {
      throw customException.error(
        statusCode.NOT_FOUND,
        null,
        "vendor not found"
      )
     
    }
    return vendor;
  } catch (error) {
    throw error;
  }
};
const allStatusAcceptedVendor = async () => {
  try {
    const vendors = await vendorQuery.allStatusAcceptedVendor();
    if (!vendors || vendors.length === 0) {
      return "No vendors found with status : accpeted.";
    }
    return vendors;
  } catch (error) {
    throw error;
  }
};
const updateVendorStatus = async (id, data) => {
  try {
    return await vendorQuery.updateVendorStatus(id, data);
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
  allStatusAcceptedVendor,
};
