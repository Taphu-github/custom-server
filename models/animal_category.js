const mongoose= require("mongoose");

const AnimalCategory = new mongoose.Schema({
  a_c_id: { type: String, required: true },
  animal_name: { type: String, required: true },
  animal_description: { type: String, required: true },
  
});

module.exports= mongoose.models.AnimalCategory || mongoose.model("AnimalCategory", AnimalCategory);

