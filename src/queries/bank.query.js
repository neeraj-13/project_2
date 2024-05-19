const { banks } = require("../models/bank.model.js");
const saveBank = async (body, session) => {
  try {
    return await new banks(body).save(session);
  } catch (error) {
    throw error;
  }
};
const viewBankById = async (id) => {
  try {
    return await banks.findById(id);
  } catch (error) {
    throw error;
  }
};
const getAllBank = async (page = 1, pageSize = 8) => {
  try {
    const skip = (page - 1) * pageSize;
    return await banks.find().skip(skip).limit(pageSize);
  } catch (error) {
    throw error;
  }
};
const updateBank = async (id, updatedData) => {
  try {
    return await banks.findByIdAndUpdate(id, { $set: { ...updatedData } });
  } catch (error) {
    throw error;
  }
};
const deleteBank = async (id) => {
  try {
    return await banks.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  saveBank,
  viewBankById,
  getAllBank,
  updateBank,
  deleteBank,
};
