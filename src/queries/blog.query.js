const  {BlogModel}  = require("../models/blog.model");

const saveBlog = async (blogData, session) => {
    try {
        return await new BlogModel(blogData).save(session);
    } catch (error) {
        throw error;
    }
};

const findAllBlogs = async (page = 1, pageSize = 8) => {
    try {
        const skip = (page - 1) * pageSize;
        return result = await BlogModel.find().skip(skip).limit(pageSize);
    }
    catch (error) {
        throw error;
    }
};

const findBlog = async (blogId) => {
    try {
        return result = await BlogModel.findById(blogId);
    }
    catch (error) {
        throw error;
    }
};


const updateBlog = async (blogId, updatedData) => {
    try {
       return result = await BlogModel.findByIdAndUpdate(blogId, { $set: { ...updatedData } });
    } catch (error) {
        throw error;
    }
};
const upPublishedBlog = async(id, data)=> {
    try{
        return result = await BlogModel.findByIdAndUpdate(id,{published: data})
    } catch (error) {
        throw error;
    }
};
const deleteBlog = async (blogId) => {
    try {
        return result = await BlogModel.findByIdAndDelete(blogId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    saveBlog,
    findBlog,
    findAllBlogs,
    updateBlog,
    upPublishedBlog,
    deleteBlog
};
