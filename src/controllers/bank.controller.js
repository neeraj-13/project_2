const bankManagementService = require("../services/bank.services");
const mongoose = require("mongoose");
const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const addBank = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await bankManagementService.addBank(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
      res,
      "Bank Successfully",
      "Bank Successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const viewBankById = async (req, res) => {
  try {
    const result = await bankManagementService.viewBank(req.query.id);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res
    );
  } catch (error) {
    if (error.errorCode) {
        return response.handleErrorResponse(error, res);
      }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error...",
      },
      res
    );
  }
};
const viewAllBank = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await bankManagementService.getAllBank(page, pageSize);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error...",
      },
      res
    );
  }
};
const updateBank = async (req, res) => {
  try {
    const result = await bankManagementService.updateBank(
      req.query.id,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: statusCode.SUCCESS_CODE, result },
      res,
      "Update Successfully",
      "Update Successfully"
    );
  } catch (error) {
    if (error.errorCode) {
        return response.handleErrorResponse(error, res);
      }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const deleteBank = async (req, res) => {
  try {
    const result = await bankManagementService.deleteBank(req.params.id);
    return response.handleSuccessResponse(
        { successCode: statusCode.SUCCESS_CODE, result },
        res,
        "Delete Successfully",
        "Delete Successfully"
      );
  } catch (error) {
    if (error.errorCode) {
        return response.handleErrorResponse(error, res);
      }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
module.exports = {
  /**
   * @swagger
   * tags:
   *  name: Bank Management
   *  description: APIs for managing Banking Loans
   * /add-bank:
   *      post:
   *          summary: Add bank detail
   *          description: Use this API to add a new bank
   *          tags:
   *              - Bank Management
   *          produces:
   *              - application/json
   *          consumes:
   *              - application/json
   *          parameters:
   *              - in: header
   *                name: Authorization
   *                required: true
   *                description: Access token for Authentication.
   *              - in: body
   *                name: Bank
   *                required: true
   *                description: Bank details to add
   *                schema:
   *                  type: object
   *                  properties:
   *                      bank:
   *                          type: string
   *                          required: true
   *                          description: name of the bank
   *                          example: ICICI
   *                      rateOfInterest:
   *                          type : number
   *                          required: true
   *                          example: 10
   *                      processingFee:
   *                          type: number
   *                          required: true
   *                          description: processing fee of the bank
   *                          example: 2000000
   *                      loanPeriod:
   *                          type: number
   *                          required: true
   *                          example: 120
   *          responses:
   *              200:
   *                  description: Success
   *              400:
   *                  description: Bad Request
   *              500:
   *                  description: Internal Server Error
   */
  addBank,
  /**
   * @swagger
   * tags:
   *  name: Employee Management
   *  description: API for managing employee
   *
   * /view-bank/{id}:
   *  get:
   *      summary: View bank details
   *      description: use this API to view the bank details
   *      tags:
   *          - Bank Management
   *      produces:
   *          - application/json
   *      consumes:
   *          - application/json
   *      parameters:
   *          - in: header
   *            name: Authorization
   *            description: Access token for authentication
   *            type: string
   *            required: true
   *          - in: query
   *            name: id
   *            description: bank id to view details
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
  viewBankById,
  /**
   * @swagger
   * tags:
   *  name: Bank Management
   *  description: API for managing Banks
   *
   * /view-all-bank:
   *  get:
   *      summary: View all bank with pagination
   *      description: Use this API to view all bank
   *      tags:
   *          - Bank Management
   *      parameters:
   *          - in: query
   *            name: page
   *            description: Page number for pagination (default is 1).
   *            schema:
   *              type: integer
   *              default: 1
   *          - in: header
   *            name: Authorization
   *            description: Access token for Authentication
   *            type: String
   *          - in: query
   *            name: pageSize
   *            description: Number of bank per page (default is 8).
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
  viewAllBank,
  /**
   * @swagger
   * tags:
   *  name: Bank Management
   *  description: API for managing bank
   *
   * /update-bank/{id}:
   *  put:
   *      summary: Update bank details
   *      description: Use this API to update bank Details
   *      tags:
   *          - Bank Management
   *      produces:
   *          - application/json
   *      consumes:
   *          - application/json
   *      parameters:
   *          - in: header
   *            name: Authorization
   *            required: true
   *            description: Access token for Authentication
   *            type: string
   *          - in: query
   *            name: id
   *            required: true
   *            description: Id of bank to update the details
   *            type: string
   *          - in: body
   *            name: body
   *            required: true
   *            description: Updated bank Details
   *            schema:
   *              type: object
   *              properties:
   *                  bank:
   *                      type: string
   *                      required: true
   *                      description: name of the bank
   *                  rateOfInterest:
   *                      type : number
   *                  processingFee:
   *                      type: number
   *                      required: true
   *                      description: processing fee of the bank
   *                  loanPeriod:
   *                      type: number
   *                      required: true
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
  updateBank,
  /**
   * @swagger
   * tags:
   *  name: Bank Management
   *  description: API for managing banks
   *
   * /delete-bank/{id}:
   *  delete:
   *      summary: Delete all bank records
   *      description: Use this API to delete all bank Records
   *      tags:
   *          - Bank Management
   *      produces:
   *          - application/json
   *      consumes:
   *          - application/json
   *      parameters:
   *          - in: path
   *            name: id
   *            description: Id of bank to delete
   *            type: string
   *            required: true
   *          - in: header
   *            name: Authorization
   *            description: Access token for Authentication
   *            type: String
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
  deleteBank,
};
