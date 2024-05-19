const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const mongoose = require("mongoose");
const VendorService = require("../services/vendor.service");
const addVendor = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await VendorService.addVendor(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Vendor added succesfully...",
      "Vendor added sucessfully...."
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
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};
const listVendors = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await VendorService.listVendors(page, pageSize);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "List of vendors fetched successfully...",
      "List of vendors fetched successfully..."
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

const editVendor = async (req, res) => {
  try {
    const result = await VendorService.editVendor(req.params.Id, req.body);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Vendor details updated successfully...",
      "Vendor details updated successfully..."
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

const deleteVendor = async (req, res) => {
  try {
    const result = await VendorService.deleteVendor(req.params.Id);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Vendor deleted successfully...",
      "Vendor deleted successfully..."
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

const viewVendorById = async (req, res) => {
  try {
    const result = await VendorService.viewVendorById(req.params.Id);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Vendor details fetched successfully...",
      "Vendor details fetched successfully..."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const allStatusAcceptedVendor = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await VendorService.allStatusAcceptedVendor(page, pageSize);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "List of all accepted vendors fetched successfully...",
      "List of all accepted vendors fetched successfully..."
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

const updateVendorStatus = async (req, res) => {
  try {
    const result = await VendorService.updateVendorStatus(
      req.params.Id,
      req.body.status
    );
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Vendor status updated successfully...",
      "Vendor status updated successfully..."
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
   * tags:
   *   - name: Vendor
   *     description: APIs for managing vendors
   */

  /**
   * @swagger
   * definitions:
   *   Vendor:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *         description: The name of the vendor
   *         example: john
   *       phoneNo:
   *         type: string
   *         required: true
   *         description: The phone number of the vendor
   *         example: 12345678
   *       companyName:
   *         type: string
   *         required: true
   *         description: The name of the company associated with the vendor
   *         example: hypersage
   *       companyAddress:
   *         type: string
   *         required: true
   *         description: The address of the company associated with the vendor
   *         example: kudlu Gate
   *       services:
   *         type: array
   *         items:
   *           type: string
   *         required: true
   *         description: List of services provided by the vendor
   *         example: [abcdef]
   *       serviceLocations:
   *         type: array
   *         items:
   *           type: string
   *         required: true
   *         description: List of locations where the vendor provides services
   *         example: [banglore]
   *       city:
   *         type: string
   *         required: true
   *         description: The city where the vendor is located
   *         example: banglore
   *       aboutVendor:
   *         type: string
   *         required: true
   *         description: Description or information about the vendor
   *         example: efhrunsind
   *       image:
   *         type: string
   *         required: true
   */

  /**
   * @swagger
   * /addvendor:
   *   post:
   *     summary: Add a new vendor
   *     description: Creates a new vendor with the provided details
   *     tags: [Vendor]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         required: true
   *         type: string
   *         example: "Bearer <your_access_token>"
   *       - in: body
   *         name: vendor
   *         description: The vendor object to be added
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Vendor'
   *     responses:
   *       200:
   *         description: Successful operation
   */
  addVendor,
  /**
   * @swagger
   * /viewVendor:
   *   get:
   *     summary: View all vendors
   *     description: Retrieves a list of all vendors
   *     tags: [Vendor]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         required: true
   *         type: string
   *         example: "Bearer <your_access_token>"
   *     responses:
   *       200:
   *         description: Successful operation
   */

  listVendors,
  /**
   * @swagger
   * /vendor/edit/{Id}:
   *   put:
   *     summary: Edit a vendor by ID
   *     description: Updates the details of a vendor with the provided ID
   *     tags: [Vendor]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *       - in: path
   *         name: Id
   *         description: ID of the vendor to edit
   *         required: true
   *         type: string
   *       - in: body
   *         name: vendor
   *         description: Updated vendor details
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: The name of the vendor
   *             phoneNo:
   *               type: string
   *               required: true
   *               description: The phone number of the vendor
   *             companyName:
   *               type: string
   *               required: true
   *               description: The name of the company associated with the vendor
   *             companyAddress:
   *               type: string
   *               required: true
   *               description: The address of the company associated with the vendor
   *             services:
   *               type: array
   *               items:
   *                 type: string
   *               required: true
   *               description: List of services provided by the vendor
   *             serviceLocations:
   *               type: array
   *               items:
   *                 type: string
   *               required: true
   *               description: List of locations where the vendor provides services
   *             city:
   *               type: string
   *               required: true
   *               description: The city where the vendor is located
   *             aboutVendor:
   *               type: string
   *               required: true
   *               description: Description or information about the vendor.
   *             image:
   *               type: string
   *               required: true
   *     responses:
   *       200:
   *         description: Successful operation
   */
  editVendor,
  /**
   * @swagger
   * /vendor/delete/{Id}:
   *   delete:
   *     summary: Delete a vendor by ID
   *     description: Deletes a vendor with the provided ID
   *     tags: [Vendor]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: Id
   *         description: ID of the vendor to delete
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successful operation
   */
  deleteVendor,
  /**
   * @swagger
   * /viewvendorById/{Id}:
   *   get:
   *     summary: View a vendor by ID
   *     description: Retrieves the details of a vendor with the provided ID
   *     tags: [Vendor]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: Id
   *         description: ID of the vendor to view
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successful operation
   */
  viewVendorById,
  /**
   * @swagger
   * /vendor/editstatus/{Id}:
   *   put:
   *     summary: Update vendor status by ID
   *     description: Updates the status of a vendor with the provided ID
   *     tags: [Vendor]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *         example: "Bearer <your_access_token>"
   *       - in: path
   *         name: Id
   *         description: ID of the vendor to update status
   *         required: true
   *         type: string
   *         example: "123456789"
   *       - in: body
   *         name: status
   *         description: Updated status
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               enum:
   *                 - requested
   *                 - accepted
   *                 - rejected
   *               required: true
   *               example: "accepted"
   *     responses:
   *       200:
   *         description: Successful operation
   */

  updateVendorStatus,
  /**
   * @swagger
   * /viewvendoraccepted:
   *   get:
   *     summary: View all accepted vendors
   *     description: Retrieves a list of all vendors with accepted status
   *     tags: [Vendor]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         required: true
   *         type: string
   *         example: "Bearer <your_access_token>"
   *     responses:
   *       200:
   *         description: Successful operation
   */
  allStatusAcceptedVendor,
};
