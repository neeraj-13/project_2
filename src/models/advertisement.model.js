const mongoose = require("mongoose");
const shortid = require("shortid");
const AdSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `Ad-${shortid.generate()}`,
  },
  AdName: {
    type: String,
    required: true,
  },
  linkOrDestinationURL: {
    type: String,
    required: true,
  },
  displayStatus: {
    type: Boolean,
    default: true,
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
const AdvertisementModel = mongoose.model("Advertisement", AdSchema);
module.exports = {
    AdvertisementModel,
};