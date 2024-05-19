const reviewService = require("../services/review.service")
const mongoose = require("mongoose");
const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");

const addReview = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const result = await reviewService.addReview(req.body,req.email, session);
        await session.commitTransaction();
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Review added succesfully...",
            "Review added sucessfully...."
        );
    }
    catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const viewReview = async (req, res) => {
    try {
        const result = await reviewService.getReview(req.params.id);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Succesfully...",
            "Sucessfully...."
        );
    }
    catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const viewVendorReview = async (req, res) => {
    try {
        const result = await reviewService.getVendorReview(req.params.id);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Succesfully...",
            "Sucessfully...."
        );
    }
    catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const viewAllReview = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const result = await reviewService.getAllReview(page, pageSize);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Succesfully...",
            "Sucessfully...."
        );
    }
    catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const updateReview = async (req, res) => {
    try {
        const result = await reviewService.updateReview(req.params.id, req.body);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Review updated succesfully...",
            "Review updated sucessfully...."
        );
    }
    catch (error) {
        return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
            res
        );
    }
};
const deleteReview = async (req, res) => {
    try {
        const result = await reviewService.deleteReview(req.params.id);
        return response.handleSuccessResponse(
            { successCode: StatusCode.SUCCESS_CODE, result },
            res,
            "Review deleted succesfully...",
            "Review deleted sucessfully...."
        );
    }
    catch (error) {
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
     *  name: Review Services
     *  description: Review Services APIs
     * /add-review:
     *  post:
     *      summary: add a review
     *      description: Use this API to add a review
     *      tags: 
     *          - Review Services
     *      produces:
     *          - application/json
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for Authentication.
     *            type: string
     *          - in: body
     *            name: review
     *            description: review to add
     *            schema:
     *              type: object
     *              properties:
     *                  rating: 
     *                      type: number
     *                      default: 1
     *                      min: 1
     *                      max: 5
     *                      required: true
     *                  review:
     *                      type: string
     *                      required: true
     *                  vendorId:
     *                      type: string
     *                      required: true
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
    addReview,
    /**
     * @swagger
     * tags: 
     *  name: Review Services
     *  description: Review services APIs
     * 
     * /view-review/{id}:
     *  get:
     *      summary: view review by review ID
     *      description: Use this API to view review 
     *      tags: 
     *          - Review Services
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for Authentication.
     *            type: string
     *          - in: path
     *            name: id
     *            description: ID to view the review
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
     *              description: Internal server error
     */
    viewReview,
    /**
     * @swagger
     * tags:
     *  name: Review Services
     *  description: Review Services APIs
     * 
     * /view-all-review:
     *  get:
     *      summary: view all review with pagination
     *      description: Use this API to view all review with pagination
     *      tags:
     *          - Review Services
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for Authentication.
     *            type: string
     *          - in: query
     *            name: page
     *            description: Page number for pagination (default is 1).
     *            schema:
     *              type: integer
     *              default: 1
     *          - in: query
     *            name: pageSize
     *            description: number of products per page (default is 8).
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
    viewAllReview,
    /**
     * @swagger
     * tags:
     *  name: Review Services
     *  description: API for review services
     * 
     * /update-review/{id}:
     *  put:
     *      summary: Update a review by review ID
     *      description: Use this API to update an existing review
     *      tags:
     *          - Review Services
     *      produces:
     *          - application/json
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for Authentication.
     *            type: string
     *          - in: path
     *            name: id
     *            description: ID of the review to update
     *            required: true
     *          - in: body
     *            name: review
     *            description: Updated review 
     *            schema:
     *              type: object
     *              required: true
     *              properties:
     *                  rating: 
     *                      type: number
     *                      default: 1
     *                      required: true
     *                  review:
     *                      type: string
     *                      required: true
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
    updateReview,
    /**
     * @swagger
     * tags:
     *  name: Review Services
     *  description: Review Services APIs
     * 
     * /delete-review/{id}:
     *  delete:
     *      summary: Delete a review by review ID
     *      description: Use this API to delete review
     *      tags:
     *          - Review Services
     *      produces:
     *          - application/json
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for Authentication.
     *            type: string
     *          - in: path
     *            name: id
     *            description: ID of the review to delete
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
     *              description: Internal server error    
     */
    deleteReview,
    /**
     * @swagger
     * tags: 
     *  name: Review Services
     *  description: Review services APIs
     * 
     * /view-vendor-review/{id}:
     *  get:
     *      summary: view vendor review by vendor ID
     *      description: Use this API to view vendor reviews
     *      tags: 
     *          - Review Services
     *      produces:
     *          - application/json
     *      parameters:
     *          - in: header
     *            name: Authorization
     *            description: Access token for Authentication.
     *            type: string
     *          - in: path
     *            name: id
     *            description: ID to view the vendor review
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
     *              description: Internal server error
     */
    viewVendorReview
}