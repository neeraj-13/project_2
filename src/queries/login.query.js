const { UserModel } = require("../models/login.model");
const findByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email: email });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findByEmail,
};
