const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const BlogService = require("../services/blog.services");
const mongoose = require("mongoose");

const addBlog = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await BlogService.addBlog(req.body, req.email, session);
    await session.commitTransaction();
    return response.handleSuccessResponse({
      successCode: StatusCode.SUCCESS_CODE,
      result,
    },
      res,
      "Blog added successfully...",
      "Blog added successfully..."
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse({ errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" }, res);
  }
  finally {
    session.endSession();
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const result = await BlogService.getAllBlogs();
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "List of blogs fetched successfully...",
      "List of blogs fetched successfully..."
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

const getBlogById = async (req, res) => {
  try {
    const result = await BlogService.getBlog(req.params.id);
    if (!result) {
      return response.handleErrorResponse(
        { errorCode: StatusCode.NOT_FOUND, message: "Blog not found" },
        res
      );
    }
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Blog details fetched successfully...",
      "Blog details fetched successfully..."
    );
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const updateBlog = async (req, res) => {
  try {
    const result = await BlogService.updateBlog(req.params.id, req.body);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Blog details updated successfully...",
      "Blog details updated successfully..."
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
const updatePublished = async (req, res) => {
  try {
    const result = await BlogService.upPublishedBlog(
      req.params.id,
      req.body.published
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "details of published blog updated sucessfully",
      "details of published blog updated sucessfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const deleteBlog = async (req, res) => {
  try {
    const result = await BlogService.deleteBlog(req.params.id);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Blog deleted successfully...",
      "Blog deleted successfully..."
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

module.exports = {
  /**
   * @swagger
   * tags:
   *  name: Blog Services
   *  description: Blog Service APIs
   * /add-blog:
   *  post:
   *      summary: Add a Blog 
   *      description: Use this API to add a new Blog
   *      tags: 
   *          - Blog Services
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
   *            name: blog
   *            description: Blog details to add
   *            required: true
   *            schema:
   *              type: object
   *              properties:
   *                  title: 
   *                      type: string
   *                      required: true
   *                      description: Title of the blog
   *                  content:
   *                      type: string
   *                      required: true
   *                      description: Content of the blog
   *                  image:
   *                      type: array
   *                      items:
   *                          type: string
   *                      description: Image URLs related to the blog
   *                  published:
   *                      type: boolean
   *                      default: false
   *                      description: Whether the blog is published or not
   *                  author:
   *                      type: string
   *                      required: true
   *                      description: Author of the blog
   *      responses:
   *          200: 
   *              description: Success
   *          400:
   *              description: Bad Request
   *          401:
   *              description: Unauthorized
   *          500: 
   *              description: Internal Server Error
   */
  addBlog,
  /**
   * @swagger
   * tags:
   *  name: Blog Services 
   *  description: Blog Service APIs
   * /get-all-blog:
   *  get:
   *      summary: View all blog with pagination
   *      description: Use this API to view all blog
   *      tags:
   *          - Blog Services
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
   *            description: Number of blog per page (default is 8).
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
  getAllBlogs,

  /**
   * @swagger
   * tags:
   *  name: Blog Services
   *  description: Blog Service APIs
   * /get-blog/{id}:
   *  get:
   *      summary: View Blog by ID
   *      description: Use this API to view the Blog by ID
   *      tags:
   *          - Blog Services
   *      produces:
   *          - applicatin/json
   *      consumes:
   *          - application/json
   *      parameters:
   *          - in: header
   *            name: Authorization
   *            description: Access token for Authentication.
   *            type: string
   *          - in: path
   *            name: id
   *            required: true
   *            description: ID to view Blog
   *      responses:
   *          200: 
   *              description: Success
   *          400:
   *              description: Bad Request
   *          401:
   *              description: Unauthorized
   *          500: 
   *              description: Internal Server Error
   */
  getBlogById,
  /**
   * @swagger
   * tags:
   *  name: Blog Services
   *  description: Blog Service APIs
   * /update-blog/{id}:
   *  put:
   *      summary: Update blog by ID
   *      description: Use this API to update blog with ID
   *      tags:
   *          - Blog Services
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
   *            description: ID to update blog
   *            required: true
   *          - in: body
   *            name: blog
   *            schema:
   *              type: object
   *              required: true
   *              properties:
   *                  title: 
   *                      type: string
   *                      required: true
   *                      description: Title to add blogs
   *                  content:     
   *                      type: string
   *                      description: Content of the blog
   *                      required: true
   *                  image:
   *                      type: array
   *                      items:
   *                          type: string
   *                      description: Image URLs related to the blog
   *                  published:
   *                      type: boolean
   *                      description: Indicates whether the blog is published or not
   *                      default: true
   *                  author:
   *                      type: string
   *                      description: Author of the blog
   *                      required: true
   *      responses:
   *          200:   
   *              description: Success
   *          400:
   *              description: Bad Request
   *          500:
   *              description: Internal Server Error              
   */
  updateBlog,
  /**
    * @swagger
    * tags:
    *  name: Blog Services
    *  description: Blog Service APIs
    * /update-blog-published/{id}:
    *  put:
    *      summary: Decide blog view by user or not
    *      description: Use this API to update blog with ID
    *      tags:
    *          - Blog Services
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
    *            description: ID to update blog
    *            required: true
    *          - in: body
    *            name: blog
    *            schema:
    *              type: object
    *              required: true
    *              properties:
    *                  published:
    *                      type: boolean
    *                      description: Indicates whether the blog is published or not
    *      responses:
    *          200:   
    *              description: Success
    *          400:
    *              description: Bad Request
    *          500:
    *              description: Internal Server Error              
    */
  updatePublished,
  /**
   * @swagger
   * tags:
   *  name: Blog Services
   *  description: Blog Service APIs
   * /delete-blog/{id}:
   *  delete:
   *      summary: Delete blog by ID
   *      description: Use this API to delete blog with ID
   *      tags:
   *          - Blog Services
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
   *            description: ID to delete blog
   *            required: true
   *      responses:
   *          200:   
   *              description: Success
   *          400:
   *              description: Bad Request
   *          401:
   *              description: Unauthorized
   *          500:
   *              description: Internal Server Error
   */
  deleteBlog,
}
