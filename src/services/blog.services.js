const blogQuery = require("../queries/blog.query");
const query = require("../queries/login.query");
const customException = require("../../commons/exception/customException");

const addBlog = async (body, session) => {
  try {
    const { title, content, image, published, author } = body;
    const saveData = {
      title: title,
      content: content,
      image: image,
      published: published,
      author: author,
    };
    return await blogQuery.saveBlog(saveData, session);
  } catch (error) {
    throw error;
  }
};


const getAllBlogs = async (page, pageSize) => {
  try {
    return result = await blogQuery.findAllBlogs(page, pageSize);
  } catch (error) {
      throw error;
  }
};

const getBlog = async (blogId) => {
  try {
    const blog = await blogQuery.findBlog(blogId);
    if (!blog) {
      throw customException.error(
          statuscode.NOT_FOUND,
          null,
          "There is no blog associated with this Id, Please check and enter correct one..."
      );
    }
    return blog;
} catch (error) {
    throw error;
}
};

const updateBlog = async (blogId, updatedData) => {
  try {
    const existingBlog = await blogQuery.findBlog(blogId);
    if (!existingBlog) {
      throw customException.error(
          statuscode.NOT_FOUND,
          null,
          "There is no blog associated with this Id, Please check and enter correct one..."
      );
    }
    return result = await blogQuery.updateBlog(blogId, updatedData);
} catch (error) {
    throw error;
}
};
const upPublishedBlog = async (id, data) =>{
  try {
    return await blogQuery.upPublishedBlog(id, data);
  } catch(error){
    throw error;
  }
};
const deleteBlog = async (blogId) => {
  try {
    const blogIdExist = await blogQuery.findBlog(blogId);
    if (!blogIdExist) {
      throw customException.error(
          statuscode.NOT_FOUND,
          null,
          "There is no blog associated with this Id, Please check and enter correct one..."
      );
    }
    return result = await blogQuery.deleteBlog(blogId);
} catch (error) {
    throw error;
}
};

module.exports = {
  addBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  upPublishedBlog,
  deleteBlog,
};
