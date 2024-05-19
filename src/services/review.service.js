const reviewQuery = require("../queries/review.query");
const vendorQuery = require("../queries/vendor.query");
const query = require("../queries/login.query");
const customException = require("../../commons/exception/customException");
const addReview = async (body, email, session) => {
    try {
        const findEmail= await query.findByEmail(email);
        const {rating,review,vendorId}= body;
        const saveData= {
            rating: rating,
            review: review,
            vendorId: vendorId,
            name: findEmail.name,
            email: findEmail.email
        };
        return await reviewQuery.saveReview(saveData, session);
    } catch (error) {
        throw error;
    }
};
const getVendorReview = async (vendorId) => {
    try {
        const getProfile = await vendorQuery.viewVendorById(vendorId);
        const result = await reviewQuery.findVendorReview(vendorId);
        if (!result) {
            throw customException.error(
                statuscode.NOT_FOUND,
                null,
                "This ID is not associated with any Review , Please enter correct one."
            );
        }
        return {getProfile,result};
    } catch (error) {
        throw error;
    }
};
const getReview = async (reviewId) => {
    try {
        const result = await reviewQuery.findReview(reviewId);
        if (!result) {
            throw customException.error(
                statuscode.NOT_FOUND,
                null,
                "This ID is not associated with any Review , Please enter correct one."
            );
        }
        return result;
    } catch (error) {
        throw error;
    }
};
const getAllReview = async (page, pageSize) => {
    try {
        return await reviewQuery.findAllReview(page, pageSize);
    } catch (error) {
        throw error;
    }
};
const updateReview = async (reviewId, updatedData) => {
    try {
        const existingReview = await reviewQuery.findReview(reviewId);
        if (!existingReview) {
            throw customException.error(
                statuscode.NOT_FOUND,
                null,
                "This ID is not associated with any Review , Please enter correct one."
            );
        }
        return await reviewQuery.updateReview(reviewId, updatedData);
    } catch (error) {
        throw error;
    }
};
const deleteReview = async (serviceId) => {
    try {
        const reviewIdExist = await reviewQuery.findReview(serviceId);
        if (!reviewIdExist) {
            throw customException.error(
                statuscode.NOT_FOUND,
                null,
                "This ID is not associated with any Review , Please enter correct one."
            );
        }
        return await reviewQuery.deleteReview(serviceId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addReview,
    getReview,
    getAllReview,
    updateReview,
    deleteReview,
    getVendorReview
}