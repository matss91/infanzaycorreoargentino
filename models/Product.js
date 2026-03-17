const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  section:String,
  length: Number,
  width: Number,
  height:Number,
  distance_unit: String,
  weight: Number,
  mass_unit: String
});

module.exports = model("Product", ProductSchema);
 
