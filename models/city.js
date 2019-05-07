const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: String,
  description: String,
  country: String,
  imageUrl: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
