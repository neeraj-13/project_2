const { PropertyModel } = require("../models/propertyManagement.model");

const saveProperty = async (body, session) => {
  try {
    const property = await new PropertyModel(body);
    await property.save(session);
    return property;
  } catch (error) {
    throw error;
  }
};
const upProperty = async(id, body)=>{
    try {
        return await PropertyModel.findByIdAndUpdate( id , body, { new: true });
    } catch (error) {
        throw error; 
    }
}
// const editService = async (Id, updatedData) => {
//   try {
//       return  await ServiceModel.findByIdAndUpdate({ _id: Id }, updatedData, { new: true });
//   } catch (error) {
//       throw error;
//   }
// };
const viewAcceptProperty = async () => {
  try {
    const properties = await PropertyModel.find({status: "accept"});
    return properties;
  } catch (error) {
    throw error;
  }
};
const viewReqProperty = async(page = 1, pageSize = 8)=>{
    try {
        const skip = (page - 1) * pageSize;
        const properties = await PropertyModel.find({status: "request"}).skip(skip).limit(pageSize);
        return properties;
      } catch (error) {
        throw error;
      } 
}
const viewRejProperty = async(page = 1, pageSize = 8)=>{
    try {
        const skip = (page - 1) * pageSize;
        const properties = await PropertyModel.find({status: "reject"}).skip(skip).limit(pageSize);
        return properties;
      } catch (error) {
        throw error;
      } 
}
const viewAllProperty = async(page = 1, pageSize = 8)=>{
  try {
      const skip = (page - 1) * pageSize;
      const properties = await PropertyModel.find().skip(skip).limit(pageSize);
      return properties;
    } catch (error) {
      console.log(error);
      throw error;
    } 
}
const viewPropertyById = async (id) => {
  try {
      return await PropertyModel.findById(id);
  } catch (error) {
      throw error;
  }
};
const upPropertyStatus = async(id, data)=>{
    try {
        return await PropertyModel.findByIdAndUpdate(id,{status: data});
    } catch (error) {
        throw error;
    }
}
const delProperty = async(id)=>{
    try {
        return await PropertyModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;  
    }
}
module.exports = {
  saveProperty,
  upProperty,
  viewAcceptProperty,
  viewRejProperty,
  viewReqProperty,
  viewAllProperty,
  viewPropertyById,
  upPropertyStatus,
  delProperty
};
