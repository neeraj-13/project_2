const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const mongoose = require("mongoose");
const categoryService = require("../services/category.service");
const savePropertyIntoCat = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await categoryService.savePropertyIntoCat(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Property added into category successfully",
      "Property added into category successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.DATA_ALREADY_EXISTS,
          message: error.errmsg,
          displayMessage: `${
            error.keyValue[Object.keys(error.keyValue)[0]]
          } already exists`,
        },
        res
      );
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const updatePropertyCat = async (req, res) => {
  try {
    const result = await categoryService.updatePropertyCat(
      req.params.id,
      req.body
    );
    return result;
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewAllCategories = async () => {
  try {
  } catch (error) {}
};

const delPropertyCat = async () => {
  try {
  } catch (error) {}
};
const addPropertyIntoExistingCat = async (req, res) => {
  try {
    const result = await categoryService.addPropertyIntoExistingCat(
      req.params.catId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Property added into category successfully",
      "Property added into category successfully"
    );
  } catch (error) {
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.DATA_ALREADY_EXISTS,
          message: error.errmsg,
          displayMessage: `${
            error.keyValue[Object.keys(error.keyValue)[0]]
          } already exists`,
        },
        res
      );
    }
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
   * /add-prop-into-cat:
   *   post:
   *     summary: Save a property into a category
   *     description: Use this API to save a property into a category.
   *     tags:
   *       - Property Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - name: body
   *         in: body
   *         description: Request body containing property and category information
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: The title of the category.
   *               required: true
   *             subTitle:
   *               type: string
   *               description: The subtitle of the category.
   *             propertiesIds:
   *               type: array
   *               description: An array of property IDs to add into the category.
   *               items:
   *                 type: string
   *               required: true
   *               example: ["ONLYPROPERTY-USER-PM-iKcJhcYWB", "ONLYPROPERTY-USER-PM-uk2G3ThJY"]
   *             startDate:
   *               type: string
   *               format: date
   *               description: The start date of the category.
   *               required: true
   *               example: "2024-05-01"
   *             endDate:
   *               type: string
   *               format: date
   *               description: The end date of the category.
   *               required: true
   *               example: "2024-06-01"
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  savePropertyIntoCat,
  /**
   * @swagger
   * /add-prop-into-existing-cat/{catId}:
   *   put:
   *     summary: Add properties into an existing category
   *     description: Use this API to add properties into an existing category.
   *     tags:
   *       - Property Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - name: catId
   *         in: path
   *         description: ID of the existing category into which properties will be added.
   *         required: true
   *         type: string
   *       - name: body
   *         in: body
   *         description: Request body containing property IDs to add into the category.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             propertiesIds:
   *               type: array
   *               description: An array of property IDs to add into the category.
   *               items:
   *                 type: string
   *               required: true
   *               example: ["ONLYPROPERTY-USER-PM-iKcJhcYWB", "ONLYPROPERTY-USER-PM-uk2G3ThJY"]
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  addPropertyIntoExistingCat,
  updatePropertyCat,
  viewAllCategories,
  delPropertyCat,
};
