const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const propertyQuery = require("../queries/property.query");
const loginQuery = require("../queries/login.query");
const saveProperty = async (body, userId, session) => {
  try {
    const { name, number, email, role } = await loginQuery.findByEmail(userId);
    body.addedBy = { name, number, email, role };
    return await propertyQuery.saveProperty(body, session);
  } catch (error) {  
    throw error;
  }
};
const upProperty = async (id, body) => {
  try {
    return await propertyQuery.upProperty(id, body);
  } catch (error) {
    throw error;
  }
};
const viewAcceptProperty = async () => {
  try {
    return await propertyQuery.viewAcceptProperty();
  } catch (error) {
    throw error;
  }
};
const viewRejProperty = async (page, pageSize) => {
  try {
    return await propertyQuery.viewRejProperty(page, pageSize);
  } catch (error) {
    throw error;
  }
};
const viewReqProperty = async (page, pageSize) => {
  try {
    return await propertyQuery.viewReqProperty(page, pageSize);
  } catch (error) {
    throw error;
  }
};
const viewAllProperty = async (page, pageSize) => {
  try {
    return await propertyQuery.viewAllProperty(page, pageSize);
  } catch (error) {
   
    throw error;
  }
};
const viewPropertyById = async (id) => {
  try {
    const property = await propertyQuery.viewPropertyById(id);
    if (!property || property.length === 0) {
      throw customException.error(
        statusCode.NOT_FOUND,
        null,
        "Not Found. The specified property ID does not exist."
      );
    }
    return property;
  } catch (error) {
    throw error;
  }
};
const upPropertyStatus = async (id, data) => {
  try {
    return await propertyQuery.upPropertyStatus(id, data);
  } catch (error) {
    throw error;
  }
};
const delProperty = async(id)=>{
    try {
        return await propertyQuery.delProperty(id);
    } catch (error) {
        throw error;
    }
}
module.exports = {
  saveProperty,
  upProperty,
  viewAcceptProperty,
  viewRejProperty,
  viewReqProperty,
  viewAllProperty,
  viewPropertyById,
  upPropertyStatus,
  delProperty,
};
