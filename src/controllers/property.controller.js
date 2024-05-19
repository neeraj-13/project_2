const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const mongoose = require("mongoose");
const propertyService = require("../services/property.service");

const saveProperty = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const result = await propertyService.saveProperty(
      req.body,
      req.email,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Property added sucessfully",
      "propety added sucessfully"
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};

const viewAcceptProperty = async (req, res) => {
  try {
    // const { page, pageSize } = req.query;
    const result = await propertyService.viewAcceptProperty();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "list of viewaccepted fetched sucessfully",
      "list of viewaccepted fetched sucessfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewRejectProperty = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await propertyService.viewRejProperty(page, pageSize);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "fetch rejected property sucessfully",
      "fetch rejected property sucessfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewRequestProperty = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await propertyService.viewReqProperty(page, pageSize);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "list of requested property fetched sucessfully.",
      "list of requested property fetched sucessfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewAllProperty = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await propertyService.viewAllProperty(page, pageSize);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "list of properties fetched sucessfully.",
      "list of properties  fetched sucessfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const updateProperty = async (req, res) => {
  try {
    const result = await propertyService.upProperty(req.params.id, req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "property updated sucessfully.",
      "property updated  sucessfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};

const deleteProperty = async (req, res) => {
  try {
    const result = await propertyService.delProperty(req.params.id);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "property deleted sucessfully.",
      "property deleted sucessfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};

const viewPropertyById = async (req, res) => {
  try {
    const result = await propertyService.viewPropertyById(req.params.id);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "propertie by Id fetched sucessfully.",
      "propertie by Id fetched sucessfully."
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

const updatePropertyStatus = async (req, res) => {
  try {
    const result = await propertyService.upPropertyStatus(
      req.params.id,
      req.body.status
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "details of property status updated sucessfully",
      "details of property status updated sucessfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

module.exports = {
  /**
   * @swagger
   * /add-property:
   *   post:
   *     summary: Add a new property
   *     description: Use this API to add a new property
   *     tags:
   *       - Property Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: body
   *         name: property
   *         description: Property details to add
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             propertyType:
   *               type: string
   *               enum: ["rent", "sell"]
   *               required: true
   *             category:
   *               type: string
   *               enum: ["apartment", "house/villa", "PG/hostel", "commercial", "roommate"]
   *               required: true
   *             propertySubType:
   *               type: string
   *               enum: ["1BHK", "2BHK", "3BHK", "4BHK", "4+BHK", "1RK"]
   *               required: true
   *             city:
   *               type: string
   *               required: true
   *             location:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   description:
   *                     type: string
   *                   placeId:
   *                     type: string
   *               required: true
   *             address:
   *               type: string
   *             builtUpArea:
   *               type: number
   *             carpetArea:
   *               type: number
   *             furnishing:
   *               type: string
   *               enum: ["furnished", "semi-furnished", "un-furnished"]
   *             age:
   *               type: string
   *               enum: ["less than one year", "1-3 years", "3-5 years", "5-10 years", "10+", "under construction"]
   *             totalFloors:
   *               type: number
   *             floorNumber:
   *               type: number
   *             facing:
   *               type: string
   *             parking:
   *               type: string
   *             waterSupply:
   *               type: string
   *             bathrooms:
   *               type: number
   *             bedrooms:
   *               type: number
   *             balconies:
   *               type: number
   *             powerBackup:
   *               type: string
   *             description:
   *               type: string
   *             tenantType:
   *               type: string
   *               enum: ["family", "students", "commercial", "bachelor", "any"]
   *             maxTenantsAllowed:
   *               type: number
   *             possession:
   *               type: string
   *             amenities:
   *               type: array
   *               items:
   *                 type: string
   *             rentAmount:
   *               type: number
   *             negotiable:
   *               type: boolean
   *             deposit:
   *               type: number
   *             maintenance:
   *               type: number
   *             brokerage:
   *               type: boolean
   *             petFriendly:
   *               type: boolean
   *             images:
   *               type: array
   *               items:
   *                 type: string
   *               validate:
   *                 validator: arrayLimit
   *                 message: '{PATH} exceeds the limit of 4'
   *             ownerVoiceVideo:
   *               type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  saveProperty,
  /**
   * @swagger
   * /view-accept-property:
   *   get:
   *     summary: View and accept properties
   *     description: Use this API to view and accept properties
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */

  viewAcceptProperty,
  /**
   * @swagger
   * /view-reject-property:
   *   get:
   *     summary: View and reject properties
   *     description: Use this API to view and accept properties
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  viewRejectProperty,
  /**
   * @swagger
   * /view-request-property:
   *   get:
   *     summary: View and request properties
   *     description: Use this API to view and accept properties
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  viewRequestProperty,
  /**
   * @swagger
   * /view-all-properties:
   *   get:
   *     summary: View all properties
   *     description: Use this API to view and accept properties
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  viewAllProperty,
  /**
   * @swagger
   * /update-property/{id}:
   *   put:
   *     summary: Update a property
   *     description: Use this API to update an existing property
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
   *       - name: Id
   *         in: path
   *         description: ID of the property to edit
   *         required: true
   *         type: string
   *       - name: vendor
   *         in: body
   *         description: Updated property details
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             propertyType:
   *               type: string
   *               enum: ["rent", "sell"]
   *             category:
   *               type: string
   *               enum: ["apartment", "house/villa", "PG/hostel", "commercial", "roommate"]
   *             propertySubType:
   *               type: string
   *               enum: ["1BHK", "2BHK", "3BHK", "4BHK", "4+BHK", "1RK"]
   *             city:
   *               type: string
   *             location:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   description:
   *                     type: string
   *                   placeId:
   *                     type: string
   *               required: true
   *             address:
   *               type: string
   *             builtUpArea:
   *               type: number
   *             carpetArea:
   *               type: number
   *             furnishing:
   *               type: string
   *               enum: ["furnished", "semi-furnished", "un-furnished"]
   *             age:
   *               type: string
   *               enum: ["less than one year", "1-3 years", "3-5 years", "5-10 years", "10+", "under construction"]
   *             totalFloors:
   *               type: number
   *             floorNumber:
   *               type: number
   *             facing:
   *               type: string
   *             parking:
   *               type: string
   *             waterSupply:
   *               type: string
   *             bathrooms:
   *               type: number
   *             bedrooms:
   *               type: number
   *             balconies:
   *               type: number
   *             powerBackup:
   *               type: string
   *             description:
   *               type: string
   *             tenantType:
   *               type: string
   *               enum: ["family", "students", "commercial", "bachelor", "any"]
   *             maxTenantsAllowed:
   *               type: number
   *             possession:
   *               type: string
   *             amenities:
   *               type: array
   *               items:
   *                 type: string
   *             rentAmount:
   *               type: number
   *             negotiable:
   *               type: boolean
   *             deposit:
   *               type: number
   *             maintenance:
   *               type: number
   *             brokerage:
   *               type: boolean
   *             petFriendly:
   *               type: boolean
   *             images:
   *               type: array
   *               items:
   *                 type: string
   *               validate:
   *                 arrayLimit: "{PATH} exceeds the limit of 4"
   *             ownerVoiceVideo:
   *               type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  updateProperty,
  /**
   * @swagger
   * /view-accept-property:
   *   get:
   *     summary: View and accept properties
   *     description: Use this API to view and accept properties
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */

  viewAcceptProperty,
  /**
   * @swagger
   * /view-reject-property:
   *   get:
   *     summary: View and reject properties
   *     description: Use this API to view and accept properties
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  viewRejectProperty,
  /**
   * @swagger
   * /view-request-property:
   *   get:
   *     summary: View and request properties
   *     description: Use this API to view and accept properties
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  viewRequestProperty,
  /**
   * @swagger
   * /view-all-properties:
   *   get:
   *     summary: View all properties
   *     description: Use this API to view and accept properties
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  viewAllProperty,
  /**
   * @swagger
   * /update-property/{id}:
   *   put:
   *     summary: Update a property
   *     description: Use this API to update an existing property
   *     tags:
   *       - Property Management
   *     security:
   *       - Authorization: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: id
   *         description: ID of the property to update
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: body
   *         description: Updated property details
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             propertyType:
   *               type: string
   *               enum: ["rent", "sell"]
   *             category:
   *               type: string
   *               enum: ["apartment", "house/villa", "PG/hostel", "commercial", "roommate"]
   *             propertySubType:
   *               type: string
   *               enum: ["1BHK", "2BHK", "3BHK", "4BHK", "4+BHK", "1RK"]
   *             city:
   *               type: string
   *             location:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   description:
   *                     type: string
   *                   placeId:
   *                     type: string
   *               required: true
   *             address:
   *               type: string
   *             builtUpArea:
   *               type: number
   *             carpetArea:
   *               type: number
   *             furnishing:
   *               type: string
   *               enum: ["furnished", "semi-furnished", "un-furnished"]
   *             age:
   *               type: string
   *               enum: ["less than one year", "1-3 years", "3-5 years", "5-10 years", "10+", "under construction"]
   *             totalFloors:
   *               type: number
   *             floorNumber:
   *               type: number
   *             facing:
   *               type: string
   *             parking:
   *               type: string
   *             waterSupply:
   *               type: string
   *             bathrooms:
   *               type: number
   *             bedrooms:
   *               type: number
   *             balconies:
   *               type: number
   *             powerBackup:
   *               type: string
   *             description:
   *               type: string
   *             tenantType:
   *               type: string
   *               enum: ["family", "students", "commercial", "bachelor", "any"]
   *             maxTenantsAllowed:
   *               type: number
   *             possession:
   *               type: string
   *             amenities:
   *               type: array
   *               items:
   *                 type: string
   *             rentAmount:
   *               type: number
   *             negotiable:
   *               type: boolean
   *             deposit:
   *               type: number
   *             maintenance:
   *               type: number
   *             brokerage:
   *               type: boolean
   *             petFriendly:
   *               type: boolean
   *             images:
   *               type: array
   *               items:
   *                 type: string
   *               validate:
   *                 arrayLimit: "{PATH} exceeds the limit of 4"
   *             ownerVoiceVideo:
   *               type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */

  updateProperty,
  /**
   * @swagger
   * /update-property-status/{id}:
   *   put:
   *     summary: Update the status of a property
   *     description: Use this API to update the status of an existing property
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
   *       - name: id
   *         in: path
   *         description: ID of the property to edit status
   *         required: true
   *         type: string
   *       - name: status
   *         in: body
   *         description: New status of the property
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               description: The new status of the property
   *               enum: ["accept", "reject", "request"]
   *               required: true
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */
  updatePropertyStatus,
  /**
   * @swagger
   * /delete-property/{id}:
   *   delete:
   *     summary: Delete a property
   *     description: Use this API to delete an existing property
   *     tags:
   *       - Property Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         description: The ID of the property to delete
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   */

  deleteProperty,
  /**
   * @swagger
   * /view-property/{id}:
   *   get:
   *     summary: View a property by ID
   *     description: Use this API to view details of a property by its ID
   *     tags:
   *       - Property Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication. (e.g., Bearer <token>)
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         description: The ID of the property to view
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully retrieved the property details.
   *       400:
   *         description: Bad Request. Invalid ID or missing required parameters.
   *       401:
   *         description: Unauthorized. Authentication token is missing or invalid.
   *       404:
   *         description: Not Found. The specified property ID does not exist.
   *       500:
   *         description: Internal Server Error. Something went wrong on the server side.
   */

  viewPropertyById,
};
