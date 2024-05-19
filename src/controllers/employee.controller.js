const empManagementService = require("../services/employee.service");
const mongoose = require("mongoose");
const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");

const addEmp = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const result = await empManagementService.addEmp(req.body, session);
        await session.commitTransaction();
        return response.handleSuccessResponse({
            successCode: StatusCode.SUCCESS_CODE, result,
        }, res,
            "Employee added successful...",
            "Employee added successful...");
    } catch (error) {
        await session.abortTransaction();
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        if (error.code === 11000) {
            return response.handleErrorResponse({
                errorCode: StatusCode.DATA_ALREADY_EXISTS,
                message: error.errmsg,
                displayMessage: `${error.keyValue[Object.keys(error.keyValue)[0]]} already exists`,
            }, res);
        }
        return response.handleErrorResponse({
            errorCode: StatusCode.SERVER_ERROR,
            message: "Internal server error"
        }, res);
    }
    finally {
        session.endSession();
    } 
};
const viewEmp = async (req, res) => {
    try {
        const result = await empManagementService.viewEmp(req.query.id);
        return response.handleSuccessResponse({
            successCode: StatusCode.SUCCESS_CODE,
            result
        }, res,
            "Employee details fetched successful...",
            "Employee details fetched successful...");
    }
    catch (error) {
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        if (errorCode === 404) {
            return response.handleErrorResponse({
                errorCode: StatusCode.NOT_FOUND,
                message: "Resource not found!",
            }, res);
        }
        return response.handleErrorResponse({
            errorCode: StatusCode.SERVER_ERROR,
            message: "Internal server error",
        }, res);
    }
};
const viewAllEmp = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const result = await empManagementService.getAllEmp(page, pageSize);
        return response.handleSuccessResponse({
            successCode: StatusCode.SUCCESS_CODE,
            result
        }, res,
            "Employee details fetched successful...",
            "Employee details fetched successful..."
        );
    }
    catch (error) {
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        if (errorCode === 404) {
            return response.handleErrorResponse({
                errorCode: StatusCode.NOT_FOUND,
                message: "No resource found , It's empty!",
            }, res);
        }
        return response.handleErrorResponse({
            errorCode: StatusCode.SERVER_ERROR,
            message: "Internal server error",
        }, res);
    }
};
const viewActiveEmp = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const result = await empManagementService.viewActiveEmp(page, pageSize);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res, "List of active employee fetched successful...",
            "List of active employee fetched successful..."
        );
    } catch (error) {
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        if (errorCode === 404) {
            return response.handleErrorResponse({
                errorCode: StatusCode.NOT_FOUND,
                message: "No resource found , It's empty!",
            }, res);
        }
        return response.handleErrorResponse({
            errorCode: StatusCode.SERVER_ERROR,
            message: "Internal server error",
        }, res);
    }
};
const viewInactiveEmp = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const result = await empManagementService.viewInactiveEmp(page, pageSize);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res, "List of inactive employee fetched successful...",
            "List of inactive employee fetched successful..."
        );
    } catch (error) {
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        if (errorCode === 404) {
            return response.handleErrorResponse({
                errorCode: StatusCode.NOT_FOUND,
                message: "No resource found , It's empty!",
            }, res);
        }
        return response.handleErrorResponse({
            errorCode: StatusCode.SERVER_ERROR,
            message: "Internal server error",
        }, res);
    }
};
const updateEmp = async (req, res) => {
    try {
        const result = await empManagementService.updateEmp(req.query.id, req.body);
        return response.handleSuccessResponse({ successCode: StatusCode.SUCCESS_CODE, result }, res,
            "Employee details updated successful...",
            "Employee details updated successful...");
    } catch (error) {
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        if (error.code === 11000) {
            return response.handleErrorResponse({
                errorCode: StatusCode.DATA_ALREADY_EXISTS,
                message: error.errmsg,
                displayMessage: `${error.keyValue[Object.keys(error.keyValue)[0]]} already exists`,
            }, res);
        }
        if (errorCode === 404) {
            return response.handleErrorResponse({
                errorCode: StatusCode.NOT_FOUND,
                message: "Resource not found!",
            }, res);
        }
        return response.handleErrorResponse(
            {
                errorCode: StatusCode.SERVER_ERROR,
                message: "Internal server error",
            },
            res
        );
    };
};
const updateEmpByStatus = async (req, res) => {
    try {
        const result = await empManagementService.updateEmpByStatus(req.params.id, req.body.status);
        return response.handleSuccessResponse({ successCode: StatusCode.SUCCESS_CODE, result }, res,
            "Employee status is updated successful...",
            "Employee status is updated successful...");
    } catch (error) {
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        if (errorCode === 404) {
            return response.handleErrorResponse({
                errorCode: StatusCode.NOT_FOUND,
                message: "Resource not found!",
            }, res);
        }
        return response.handleErrorResponse(
            {
                errorCode: StatusCode.SERVER_ERROR,
                message: "Internal server error",
            },
            res
        );
    }
};
const deleteEmp = async (req, res) => {
    try {
        const result = await empManagementService.deleteEmp(req.params.id);
        return response.handleSuccessResponse({ successCode: StatusCode.SUCCESS_CODE, result }, res,
            "Employee deleted successful...",
            "Employee deleted successful...");
    } catch (error) {
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        if (errorCode === 404) {
            return response.handleErrorResponse({
                errorCode: StatusCode.NOT_FOUND,
                message: "Resource not found!",
            }, res);
        }
        return response.handleErrorResponse(
            {
                errorCode: StatusCode.SERVER_ERROR,
                message: "Internal server error",
            }, res);
    }
};
module.exports = {
    /**
     * @swagger
     * tags:
     *  name: Employee Management
     *  description: APIs for managing Employee
     * 
     * /add-employee:
     *      post:
     *          summary: Add a new employee detail
     *          description: Use this API to add a new Employee
     *          tags:
     *              - Employee Management
     *          produces:
     *              - application/json
     *          consumes:
     *              - application/json
     *          parameters:
     *              - in: header
     *                name: Authorization
     *                description: Access token for authentication.
     *                type: string
     *                required: true
     *              - in: body
     *                name: Employee
     *                required: true
     *                description: Employee details to add
     *                schema:
     *                  type: object
     *                  properties:
     *                      fullName:
     *                          type: string
     *                          required: true
     *                          description: Name of the employee
     *                          example: Your Name
     *                      contactNo:
     *                          type : string
     *                          required: true
     *                          description: The contact number of the employee
     *                          example: 9876543210
     *                      email:
     *                          type: string
     *                          format: email
     *                          required: true
     *                          description: Email id of the employee
     *                          example: abc@gmail.com
     *                      password:
     *                          type: string
     *                          required: true
     *                          description: The password of the employee
     *                          example: password
     *          responses:
     *              200:
     *                  description: Success
     *              400:
     *                  description: Bad Request
     *              401:
     *                  description: Unauthorized
     *              500:
     *                  description: Internal Server Error
     */
    addEmp,

    /**
     * @swagger
     * tags:
     *  name: Employee Management
     *  description: APIs for managing employee
     * 
     * /view-employee/{id}:
     *  get:
     *      summary: View employee detail by ID
     *      description: use this API to view the employee details
     *      tags: 
     *          - Employee Management
     *      produces:
     *          - application/json
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for authentication.
     *            type: string
     *            required: true
     *          - in: query
     *            name: id
     *            description: Employee Id to view details
     *            type: string
     *            required: true
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Bad Request
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal Server Error
     */
    viewEmp,
    /**
     * @swagger
     * tags:
     *  name: Employee Management
     *  description: APIs for managing Employee
     * 
     * /view-all-employee:
     *  get:
     *      summary: View all employee with pagination
     *      description: Use this API to view all employee
     *      tags:
     *          - Employee Management
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for authentication.
     *            type: string
     *            required: true
     *          - in: query
     *            name: page
     *            description: Page number for pagination (default is 1).
     *            schema:
     *              type: integer
     *              default: 1
     *          - in: query
     *            name: pageSize
     *            description: Number of employee per page (default is 8).
     *            schema:
     *              type: integer
     *              default: 8
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Bad Request
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    viewAllEmp,
    /**
     * @swagger
     * tags:
     *  name: Employee Management
     *  description: APIs for managing Employee
     * 
     * /view-active-employee:
     *  get:
     *      summary: View active employee list with pagination
     *      description: Use this API to view employee whose status is active
     *      tags:
     *          - Employee Management
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for authentication.
     *            type: string
     *            required: true
     *          - in: query
     *            name: page
     *            description: Page number for pagination (default is 1).
     *            schema:
     *              type: integer
     *              default: 1
     *          - in: query
     *            name: pageSize
     *            description: Number of employee per page (default is 8).
     *            schema:
     *              type: integer
     *              default: 8
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Bad Request
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    viewActiveEmp,
    /**
     * @swagger
     * tags:
     *  name: Employee Management
     *  description: APIs for managing Employee
     * 
     * /view-inactive-employee:
     *  get:
     *      summary: View inactive employee list
     *      description: Use this API to view employee whose status is inactive
     *      tags:
     *          - Employee Management
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for authentication.
     *            type: string
     *            required: true
     *          - in: query
     *            name: page
     *            description: Page number for pagination (default is 1).
     *            schema:
     *              type: integer
     *              default: 1
     *          - in: query
     *            name: pageSize
     *            description: Number of employee per page (default is 8).
     *            schema:
     *              type: integer
     *              default: 8
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Bad Request
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal server error
     */
    viewInactiveEmp,
    /**
     * @swagger
     * tags:
     *  name: Employee Management
     *  description: APIs for managing employee
     * 
     * /update-employee/{id}:
     *  put:
     *      summary: Update employee detail by ID
     *      description: Use this API to update Employee Details
     *      tags:
     *          - Employee Management
     *      produces:
     *          - application/json
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for authentication.
     *            type: string
     *            required: true
     *          - in: query
     *            name: id
     *            required: true
     *            description: Id of employee to update the details
     *            type: string
     *          - in: body
     *            name: body
     *            required: true
     *            description: Updated Employee Details
     *            schema:
     *              type: object
     *              properties:
     *                  fullName:
     *                      type: string
     *                      required: true
     *                      description: Name of the employee
     *                      example: Your Name
     *                  contactNo:
     *                      type : string
     *                      required: true
     *                      description: The contact number of the employee
     *                      example: 9876543210
     *                  email:
     *                      type: string
     *                      format: email
     *                      required: true
     *                      description: Email id of the employee
     *                      example: abc@gmail.com
     *                  remark:
     *                      type: string
     *                      description: Remark for the employee
     *                  password:
     *                      type: string
     *                      required: true
     *                      description: The password of the employee
     *                      example: password
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Bad Request
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal Server Error
     */
    updateEmp,
    /**
     * @swagger
     * tags:
     *  name: Employee Management
     *  description: APIs for managing employee
     * 
     * /update-employee-status/{id}:
     *  put:
     *      summary: Update employee status by ID
     *      description: Use this API to update Employee Details
     *      tags:
     *          - Employee Management
     *      produces:
     *          - application/json
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for authentication.
     *            type: string
     *            required: true
     *          - in: path
     *            name: id
     *            required: true
     *            description: Id of employee to update the details
     *            type: string
     *          - in: body
     *            name: status
     *            desctiption: New status of the employee
     *            required: true
     *            schema: 
     *              type: object
     *              properties:
     *                  status:
     *                      type: string
     *                      required: true
     *                      example: active
     *                      description: The new status of the employee
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Bad Request
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal Server Error
     */
    updateEmpByStatus,
    /**
     * @swagger
     * tags:
     *  name: Employee Management
     *  description: APIs for managing employee
     * 
     * /delete-employee/{id}:
     *  delete:
     *      summary: Delete an employee records by ID
     *      description: Use this API to delete an employee records
     *      tags:
     *          - Employee Management
     *      produces:
     *          - application/json
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for authentication.
     *            type: string
     *            required: true
     *          - in: path
     *            name: id
     *            description: Id of employee to delete
     *            type: string
     *            required: true
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Bad Request
     *          401:
     *              description: Unauthorized
     *          500:
     *              description: Internal Server Error
     */
    deleteEmp,
}