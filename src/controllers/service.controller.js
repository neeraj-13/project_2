const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const mongoose = require("mongoose");
const ServiceService = require("../services/service.service");
const addService = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const result = await ServiceService.addService(req.body, session);
        return response.handleSuccessResponse({ successCode: StatusCode.SUCCESS_CODE, result }, res);
    } catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const viewServices = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const result = await ServiceService.viewServices(page, pageSize);
        return response.handleSuccessResponse({ successCode: StatusCode.SUCCESS_CODE, result }, res);
    } catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const editService = async (req, res) => {
    try {
        const result = await ServiceService.editService(req.params.Id, req.body);
        return response.handleSuccessResponse({ successCode: StatusCode.SUCCESS_CODE, result }, res);
    }
    catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const deleteService = async (req, res) => {
    try {
        const result = await ServiceService.deleteService(req.params.Id);
        return response.handleSuccessResponse({ successCode: StatusCode.SUCCESS_CODE, result }, res);
    } catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const viewServiceById = async (req, res) => {
    try {
        const result = await ServiceService.viewServiceById(req.params.Id);
        return response.handleSuccessResponse({ successCode: StatusCode.SUCCESS_CODE, result }, res);
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
     *   - name: Service
     *     description: APIs for managing services
     */

    /**
     * @swagger
     * definitions:
     *   Service:
     *     type: object
     *     properties:
     *       service:
     *         type: string
     *         description: The name of the service
     *       created:
     *         type: string
     *         format: date-time
     *         required: true
     *         description: Date and time when the service was created
     */

    /**
     * @swagger
     * /addservice:
     *   post:
     *     summary: Add a new service
     *     description: Creates a new service with the provided details
     *     tags:
     *       - Service
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: service
     *         description: The service object to be added
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Service'
     *     responses:
     *       200:
     *         description: Successful operation
     */
    addService,
    /**
     * @swagger
     * /viewservices:
     *   get:
     *     summary: View all services
     *     description: Retrieves a list of all services
     *     tags:
     *       - Service
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Successful operation
     */
    viewServices,
    /**
     * @swagger
     * /service/edit/{Id}:
     *   put:
     *     summary: Edit a service by ID
     *     description: Use this API to edit details of a service by its ID
     *     tags:
     *       - Service
     *     produces:
     *       - application/json
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: Id
     *         description: ID of the service to edit
     *         required: true
     *         type: string
     *       - in: body
     *         name: service
     *         description: The updated service object
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             service:
     *               type: string
     *               description: The name of the service
     *             created:
     *               type: string
     *               format: date-time
     *               required: true
     *               description: Date and time when the service was created
     *     responses:
     *       200:
     *         description: Successful response indicating the service has been updated
     *       400:
     *         description: Bad Request - Invalid input or missing required fields
     *       401:
     *         description: Unauthorized - Missing or invalid authentication token
     *       404:
     *         description: Service not found
     *       500:
     *         description: Internal Server Error - Failed to update the service due to server issues
     */
    editService,
    /**
     * @swagger
     * /service/delete/{Id}:
     *   delete:
     *     summary: Delete a service by ID
     *     description: Deletes a service with the provided ID
     *     tags:
     *       - Service
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: Id
     *         description: ID of the service to delete
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Successful operation
     */
    deleteService,
    /**
     * @swagger
     * /viewservice_by_Id/{Id}:
     *   get:
     *     summary: View a service by ID
     *     description: Retrieves the details of a service with the provided ID
     *     tags:
     *       - Service
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: Id
     *         description: ID of the service to retrieve
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Successful operation
     */
    viewServiceById
};