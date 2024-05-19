const empManagementService = require("../services/advertisement.service");
const mongoose = require("mongoose");
const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");

const addAdvertisement = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const result = await empManagementService.addAdvertisement(req.body, session);
        await session.commitTransaction();
        session.endSession();
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Advertisement added succesfully...",
            "Advertisement added sucessfully...."
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
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
const listadvertisemnet = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const result = await empManagementService.listadvertisemnet(page, pageSize);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Successfully",
            "Successfully"
        );
    } catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const editAdvertisement = async (req, res) => {
    try {
        const result = await empManagementService.editAdvertisement(
            req.params.Id,
            req.body
        );
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Advertisement edited succesfully...",
            "Advertisement edited sucessfully...."
        );
    } catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const deleteAdvertisement = async (req, res) => {
    try {
        const result = await empManagementService.deleteAdvertisement(req.params.Id);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Advertisement deleted succesfully...",
            "Advertisement deleted sucessfully...."
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
     *   - name: Advertisement
     *     description: APIs for managing advertisements
     * definitions:
     *   Advertisement:
     *     type: object
     *     properties:
     *       AdName:
     *         type: string
     *         required: true
     *       linkOrDestinationURL:
     *         type: string
     *         required: true
     *       displayStatus:
     *         type: boolean
     *         default: true
     *       startDate:
     *         type: string
     *         format: date-time
     *         required: true
     *       endDate:
     *         type: string
     *         format: date-time
     *         required: true
     */

    /**
     * @swagger
     * /advertisement/add:
     *   post:
     *     summary: Add a new AD
     *     description: Use this API to save a new AD
     *     tags:
     *       - Advertisement
     *     security:
     *       - Authorization: []
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
     *         name: banner
     *         description: AD details to store
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Advertisement'
     *     responses:
     *       200:
     *         description: OK
     */
    addAdvertisement,
    /**
     * @swagger
     * /advertisement/list:
     *   get:
     *     summary: Get all ADs
     *     description: Use this API to retrieve all ADs
     *     tags:
     *      - Advertisement
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: header
     *         name: Authorization
     *         description: Access token for Authentication.
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Advertisement'
     */
    listadvertisemnet,
    /**
     * @swagger
     * /advertisement/edit/{Id}:
     *   put:
     *     summary: Edit a AD by ID
     *     description: Use this API to edit a AD by its ID
     *     tags:
     *       - Advertisement
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
     *         description: ID of the AD to edit
     *         required: true
     *         schema:
     *           type: string
     *       - in: body
     *         name: banner
     *         description: Updated AD details
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Advertisement'
     *     responses:
     *       200:
     *         description: OK
     */
    editAdvertisement,
    /**
     * @swagger
     * /advertisement/delete/{Id}:
     *   delete:
     *     summary: Delete a AD by ID
     *     description: Deletes a AD with the provided ID
     *     tags:
     *       - Advertisement
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
     *         description: ID of the AD to delete
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: OK
     */
    deleteAdvertisement
   
}