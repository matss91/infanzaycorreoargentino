const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  section:String,
  length: String,
  width: String,
  height:String,
  distance_unit:String,
  weight: String,
  mass_unit: String
});

module.exports = model("Product", ProductSchema);
 
