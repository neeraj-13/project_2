const { categoryModel } = require("../models/category.model");

const addPropertyCat = async (body, session) => {
  try {
    return await new categoryModel(body).save(session);
  } catch (error) {
    throw error;
  }
};
const updatePropertyCat = async (id, body) => {
  try {
    return await categoryModel.findByIdAndUpdate(id, body, { new: true });
  } catch (error) {
    throw error;
  }
};
const delPropertyCat = async (id) => {
  try {
    return await categoryModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
const findCatById = async (id) => {
  try {
    return await categoryModel.findById(id);
  } catch (error) {
    throw error;
  }
};
const viewAllCategories = async () => {
  try {
    return await categoryModel.find();
  } catch (error) {
    throw error;
  }
};
const addPropertyIntoExistingCat = async (id, propertiesIds) => {
  try {
    const result = await categoryModel.findByIdAndUpdate(id, {
      propertiesIds: propertiesIds,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addPropertyCat,
  updatePropertyCat,
  delPropertyCat,
  findCatById,
  viewAllCategories,
  addPropertyIntoExistingCat
};
