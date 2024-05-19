const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");
const vendorcontoller = require("../controllers/vendor.controller");
const servicecontoller = require("../controllers/service.controller");
const employeeController = require("../controllers/employee.controller");
const advertisementcontroller = require("../controllers/advertisement.controller");
const bankcontroller=require("../controllers/bank.controller.js");
const blogController = require("../controllers/blog.controller");
const reviewController = require("../controllers/review.controller.js");
const categoryController = require("../controllers/category.controller.js");
const Validator = require("../validators/validator");
const auth = require("../middleware/auth")

router.post('/add-property',auth,propertyController.saveProperty);
router.get('/view-accept-property',auth,propertyController.viewAcceptProperty);
router.get('/view-request-property',auth,propertyController.viewRequestProperty);
router.get('/view-reject-property',auth,propertyController.viewRejectProperty);
router.get('/view-all-properties',auth,propertyController.viewAllProperty);
router.get('/view-property/:id',auth,propertyController.viewPropertyById);
router.put('/update-property/:id',auth,propertyController.updateProperty);
router.put('/update-property-status/:id',auth,propertyController.updatePropertyStatus);
router.delete('/delete-property/:id', auth, propertyController.deleteProperty);


router.post("/addvendor",auth, Validator.validateVendor,vendorcontoller.addVendor);
router.get("/viewVendor", auth,vendorcontoller.listVendors);
router.put("/vendor/edit/:Id",auth, vendorcontoller.editVendor);
router.delete("/vendor/delete/:Id",auth, vendorcontoller.deleteVendor);
router.get("/viewVendorById/:Id", auth,vendorcontoller.viewVendorById);
router.put("/vendor/editstatus/:Id",auth, vendorcontoller.updateVendorStatus);
router.get("/viewvendoraccepted",auth, vendorcontoller.allStatusAcceptedVendor);
router.post("/addservice", Validator.validateService,servicecontoller.addService);
router.get("/viewservices", servicecontoller.viewServices);
router.get("/viewServiceById/:Id", servicecontoller.viewServiceById);
router.put("/service/edit/:Id", servicecontoller.editService);
router.delete("/service/delete/:Id", servicecontoller.deleteService);

router.post("/add-employee", auth, Validator.validateEmployee, employeeController.addEmp);
router.get("/view-employee/:id", auth, employeeController.viewEmp);
router.get("/view-all-employee", auth, employeeController.viewAllEmp);
router.get("/view-active-employee", auth, employeeController.viewActiveEmp);
router.get("/view-inactive-employee", auth, employeeController.viewInactiveEmp);
router.put("/update-employee/:id", auth, Validator.validateEmployee, employeeController.updateEmp);
router.put("/update-employee-status/:id", auth, employeeController.updateEmpByStatus);
router.delete("/delete-employee/:id", auth, employeeController.deleteEmp);

router.post('/advertisement/add', Validator.validateAdvertisement, advertisementcontroller.addAdvertisement);
router.get('/advertisement/list', advertisementcontroller.listadvertisemnet);
router.put('/advertisement/edit/:Id', advertisementcontroller.editAdvertisement);
router.delete('/advertisement/delete/:Id',advertisementcontroller.deleteAdvertisement);

//Bank Management
router.post("/add-bank",auth,Validator.validateBank,bankcontroller.addBank);
router.get("/view-bank/:id",auth, bankcontroller.viewBankById);
router.get("/view-all-bank",auth, bankcontroller.viewAllBank);
router.put("/update-bank/:id",auth,bankcontroller.updateBank);
router.delete("/delete-bank/:id",auth,bankcontroller.deleteBank);


router.post('/add-blog',auth,Validator.validateBlog,blogController.addBlog);
router.get('/get-all-blog',auth,blogController.getAllBlogs);
router.get('/get-blog/:id',auth,blogController.getBlogById);
router.put('/update-blog/:id',auth, blogController.updateBlog);
router.put('/update-blog-published/:id',auth,blogController.updatePublished);
router.delete('/delete-blog/:id',auth,blogController.deleteBlog);

router.post('/add-review',auth,Validator.validateReview, reviewController.addReview);
router.get('/view-review/:id',auth, reviewController.viewReview);
router.get('/view-all-review',auth, reviewController.viewAllReview);
router.put('/update-review/:id',auth, reviewController.updateReview);
router.delete('/delete-review/:id',auth, reviewController.deleteReview);
router.get('/view-vendor-review/:id',auth, reviewController.viewVendorReview);


router.post('/add-prop-into-cat', auth, categoryController.savePropertyIntoCat);
router.put('/add-prop-into-existing-cat/:catId', auth, categoryController.addPropertyIntoExistingCat);
module.exports = router;
