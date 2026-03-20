
const ProductSchema = new Schema({
  name: String,
  street1:String,
   city:String,
   state:String,
   zip:String,
   country: String,
   phone:String,
   email:String,
   length: String,
  width: String,
  height:String,
  distance_unit:String,
  weight: String,
  mass_unit: String
});

module.exports = model("Datos", ProductSchema);


   
     
  