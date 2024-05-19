const bankQuery = require("../queries/bank.query.js");
const customException = require("../../commons/exception/customException");
const addBank = async (body, session) => {
  try {
    return await bankQuery.saveBank(body, session);
  } catch (error) {
    throw error;
  }
};
const viewBank = async (id) => {
  try {
    return await existingBank(id);
  } catch (error) {
    throw error;
  }
};
const getAllBank = async (page, pageSize) => {
  try {
    return await bankQuery.getAllBank(page, pageSize);
  } catch (error) {
    throw error;
  }
};
const updateBank = async (id, updatedData) => {
  try {
    await existingBank(id);
    return await bankQuery.updateBank(id, updatedData);
  } catch (error) {
    throw error;
  }
};
const deleteBank = async (id) => {
  try {
    await existingBank(id);
    return await bankQuery.deleteBank(id);
  } catch (error) {
    throw error;
  }
};
const existingBank = async (id) => {
  try {
    const existingBank = await bankQuery.findBank(id);
    if (!existingBank) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invallid Input.",
        "There is no bank associated with this Id, Please check and enter correct one.",
        null,
        null
      );
    }
    return existingBank;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addBank,
  viewBank,
  getAllBank,
  updateBank,
  deleteBank,
};
