const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const catQuery = require("../queries/category.query");

const savePropertyIntoCat = async (body, session) => {
  try {
    return await catQuery.addPropertyCat(body, session);
  } catch (error) {
    throw error;
  }
};
const updatePropertyCat = async (id, body) => {
  try {
    const result = await catQuery.updatePropertyCat(id, body);
    return result;
  } catch (error) {
    throw error;
  }
};
const viewAllCategories = async () => {
  try {
    return await catQuery.viewAllCategories();
  } catch (error) {
    throw error;
  }
};
const delPropertyCat = async (id) => {
  try {
    const result = await catQuery.delPropertyCat(id);
    return result;
  } catch (error) {
    throw error;
  }
};
const addPropertyIntoExistingCat = async (id, body) => {
  try {
    const existingCategory = await catQuery.findCatById(id);
    if (!existingCategory) {
      throw customException.error(
        statusCode.NOT_FOUND,
        null,
        "There is no category associated with this Id, Please check and enter correct one..."
      );
    }
    const propertiesIds = body.propertiesIds;
    const updatedPropertyIds = [...existingCategory.propertiesIds, ...propertiesIds];
    const result = await catQuery.addPropertyIntoExistingCat(id, updatedPropertyIds);
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  savePropertyIntoCat,
  updatePropertyCat,
  viewAllCategories,
  delPropertyCat,
  addPropertyIntoExistingCat
};
