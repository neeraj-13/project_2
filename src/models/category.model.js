const mongoose = require("mongoose");
const shortid = require("shortid");

const categorySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `CAT-${shortid.generate()}`,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase()
  },
  subTitle: {
    type: String,
    required: false,
  },
  propertiesIds: {
    type: [String],
    required: true,
    
  },
  startDate: {
    type: Date,
    required: true,
  }, 
  endDate: {
    type: Date,
    required: true,
  },
});

const categoryModel = mongoose.model("categoryDetails", categorySchema);

module.exports = { categoryModel };
