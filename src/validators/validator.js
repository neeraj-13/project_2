const response = require("../../commons/response/response");
const statusCode = require("../../commons/utils/statusCode");
const Joi = require('joi');

const validateVendor = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        phoneNo: Joi.string().required(),
        companyName: Joi.string().required(),
        companyAddress: Joi.string().required(),
        services: Joi.array().items(Joi.string()).required(),
        serviceLocations: Joi.array().items(Joi.string()).required(),
        city: Joi.string().required(),
        aboutVendor: Joi.string().required(),
        image: Joi.string()
    });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: "Validation Error",
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }
};

const validateService = async (req, res, next) => {
    const schema = Joi.object({
        service: Joi.string().required(),
        created: Joi.date().default(Date.now).required()
    });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: "Validation Error",
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }
};
const validateEmployee = async (req, res, next) => {
    const schema =
        Joi.object({
            fullName: Joi.string().required(),
            contactNo: Joi.string().required(),
            email: Joi.string().email().required(),
            remark: Joi.string().allow('', null),
            password: Joi.string().required(),
            status: Joi.string(),
        });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: error,
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }
};
const validateAdvertisement = async (req, res, next) => {
    const schema = Joi.object({
        AdName: Joi.string().required(),
        linkOrDestinationURL: Joi.string().required(),
        displayStatus: Joi.boolean().default(true),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        status: Joi.boolean().default(true).label("Status"),
    });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: error,
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }
};
const validateBank = async (req, res, next) => {
    const schema =
        Joi.object({
            bank: Joi.string().required(),
            rateOfInterest: Joi.number(),
            processingFee: Joi.number().required(),
            loanPeriod: Joi.number().required(),
        });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: error,
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }

};
const validateBlog = async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.array().items(Joi.string()).required(),
        published: Joi.boolean().default(false),
        author: Joi.string().required()

    });

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: error,
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }
};
const validateReview = async (req, res, next) => {
    const schema =
        Joi.object({
            rating: Joi.number().required().min(1).max(5),
            review: Joi.string(),
            vendorId: Joi.string()
        });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: error,
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }
};
module.exports = {
    validateVendor,
    validateService,
    validateEmployee,
    validateAdvertisement,
    validateBank,
    validateBlog,
    validateReview
};
