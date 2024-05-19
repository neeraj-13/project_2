const { ReviewModel } = require("../models/review.model");

const saveReview = async (reviewData, session) => {
    try {
        return await new ReviewModel(reviewData).save(session);
    } catch (error) {
        throw error;
    }
};
const findReview = async (reviewId) => {
    try {
        return await ReviewModel.findById(reviewId);
    }
    catch (error) {
        throw error;
    }
};
const findVendorReview = async (vendorId) => {
    try {
        return await ReviewModel.find({vendorId:vendorId});
    }
    catch (error) {
        throw error;
    }
};
const findAllReview = async (page = 1, pageSize = 8) => {
    try {
        const skip = (page - 1) * pageSize;
        return await ReviewModel.find().skip(skip).limit(pageSize);
    } catch (error) {
        throw error;
    }
};
const updateReview = async (reviewId, updatedData) => {
    try {
        return await ReviewModel.findByIdAndUpdate(reviewId, { $set: { ...updatedData } }, {new: true});
    } catch (error) {
        throw error;
    }
};
const deleteReview = async (reviewId) => {
    try {
        return await ReviewModel.findByIdAndDelete(reviewId);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    saveReview,
    findReview,
    findAllReview,
    updateReview,
    deleteReview,
    findVendorReview
}