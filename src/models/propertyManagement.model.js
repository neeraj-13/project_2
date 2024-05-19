const mongoose = require("mongoose");
const shortid = require("shortid");

const propertySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `ONLYPROPERTY-USER-PM-${shortid.generate()}`,
  },
  propertyType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  propertySubType: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: [{
    description: {
      type: String,
      required: true,
    },
    placeId: {
      type: String,
      required: true,
    }
  }],
  address: String, 
  builtUpArea: Number,
  carpetArea: Number,
  furnishing: {
    type: String,
  },
  age: {
    type: String,
  },
  totalFloors: Number,
  floorNumber: Number,
  facing: String,
  parking: String,
  waterSupply: String,
  bathrooms: Number,
  bedrooms: Number,
  balconies: Number,
  powerBackup: String,
  description: String,
  tenantType: {
    type: String,
  },
  maxTenantsAllowed: Number,
  possession: String,
  amenities: [String],
  rentAmount: Number,
  negotiable: Boolean,
  deposit: Number,
  maintenance: Number,
  brokerage: Boolean,
  petFriendly: Boolean,
  images: {
    type: [String],
    validate: [arrayLimit, "{PATH} exceeds the limit of 4"],
  },
  ownerVoiceVideo: String,
  addedBy: {
    name: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "builder", "agent","admin"]
    }
  },
  status: {
    type: String,
    enum: ["accept", "reject", "request"],
    default: "accept"
  },
});

function arrayLimit(val) {
  return val.length <= 4;
}

const PropertyModel = mongoose.model("Property", propertySchema);
module.exports = { PropertyModel };
