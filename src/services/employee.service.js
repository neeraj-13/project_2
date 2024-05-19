const empQuery = require("../queries/employee.query");
const bcrypt = require("bcrypt");
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");

const addEmp = async (body, session) => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const bodyWithHashedPassword = {
            ...body,
            password: hashedPassword,
        };
        return await empQuery.saveEmp(bodyWithHashedPassword, session);
    } catch (error) {
        throw error;
    }
};
const viewEmp = async (empId) => {
    try {
        const result = await empQuery.findEmployee(empId);
        if (!result) {
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "There is no employee associated with this Id, Please check and enter correct one..."
            );
        }
        return result;
    } catch (error) {
        throw error;
    }
};
const getAllEmp = async (page, pageSize) => {
    try {
        const result = await empQuery.getAllEmployee(page, pageSize);
        if (result.length == 0) {
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "No Employee exist!"
            );
        }
        return result;
    } catch (error) {
        throw error;
    }
};
const viewActiveEmp = async (page, pageSize) => {
    try {
        const result = await empQuery.viewActiveEmp(page, pageSize);
        if (result.length == 0) {
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "There is no employe whose status is active!"
            );
        }
        return result;
    } catch (error) {
        throw error;
    }
};
const viewInactiveEmp = async (page, pageSize) => {
    try {
        const result = await empQuery.viewInactiveEmp(page, pageSize);
        if (result.length == 0) {
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "There is no employee whose status is inactive!"
            );
        }
        return result;
    } catch (error) {
        throw error;
    }
};
const updateEmpByStatus = async (id, data) => {
    try {
        const result = await empQuery.findEmployee(id);
        if (!result) {
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "There is no employee associated with this Id, Please check and enter correct one..."
            );
        }
        return await empQuery.upEmpStatus(id, data);
    } catch (error) {
        throw error;
    }
};
const updateEmp = async (empId, updatedData) => {
    try {
        const existingEmp = await empQuery.findEmployee(empId);
        if (!existingEmp) {
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "There is no employee associated with this Id, Please check and enter correct one..."
            );
        }
        const hashedPassword = await bcrypt.hash(updatedData.password, 10);
        const bodyWithHashedPassword = {
            ...updatedData,
            password: hashedPassword,
        };
        return await empQuery.updateEmp(empId, bodyWithHashedPassword);
    } catch (error) {
        throw error;
    }
};
const deleteEmp = async (empId) => {
    try {
        const existEmp = await empQuery.findEmployee(empId);
        if (!existEmp) {
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "There is no employee associated with this Id, Please check and enter correct one..."
            );
        }
        return await empQuery.deleteEmp(empId);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    addEmp,
    viewEmp,
    getAllEmp,
    viewActiveEmp,
    viewInactiveEmp,
    updateEmp,
    updateEmpByStatus,
    deleteEmp
}


