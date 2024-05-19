const { EmpManagementModel } = require("../models/employee.model");

const saveEmp = async (body, session) => {
  try {
    return await new EmpManagementModel(body).save(session);
  } catch (error) {
    throw error;
  }
};
const getAllEmployee = async (page = 1, pageSize = 8) => {
  try {
    const skip = (page - 1) * pageSize;
    const employees = await EmpManagementModel.find()
      .skip(skip)
      .limit(pageSize);
    const totalEmployees = await EmpManagementModel.countDocuments();
    return { employees, totalEmployees };
  } catch (error) {
    throw error;
  }
};
const viewActiveEmp = async (page = 1, pageSize = 8) => {
  try {
    const skip = (page - 1) * pageSize;
    return await EmpManagementModel.find({ status: "active" })
      .skip(skip)
      .limit(pageSize);
  } catch (error) {
    throw error;
  }
};
const viewInactiveEmp = async (page = 1, pageSize = 8) => {
  try {
    const skip = (page - 1) * pageSize;
    return await EmpManagementModel.find({ status: "inactive" })
      .skip(skip)
      .limit(pageSize);
  } catch (error) {
    throw error;
  }
};
const updateEmp = async (empId, updatedData) => {
  try {
    return await EmpManagementModel.findByIdAndUpdate(empId, {
      $set: { ...updatedData },
    });
  } catch (error) {
    throw error;
  }
};
const upEmpStatus = async (id, data) => {
  try {
    return await EmpManagementModel.findByIdAndUpdate(id, { status: data });
  } catch (error) {
    throw error;
  }
};
const deleteEmp = async (empId) => {
  try {
    return await EmpManagementModel.findByIdAndDelete(empId);
  } catch (error) {
    throw error;
  }
};
const findEmployee = async (empId) => {
  try {
    return await EmpManagementModel.findById(empId);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  saveEmp,
  getAllEmployee,
  viewActiveEmp,
  viewInactiveEmp,
  updateEmp,
  upEmpStatus,
  deleteEmp,
  findEmployee,
};
