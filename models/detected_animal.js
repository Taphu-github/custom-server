const mongoose= require("mongoose");

const DetectedAnimal = new mongoose.Schema({
    a_c_id: { type: String, required: true},
    d_id: { type: String, required: true },
    enroach_time: { type: String, required: true },
    enroach_date: { type: Date, required: true },  
    animal_count: {type: Number, required: true },
  
});


module.exports= mongoose.models.DetectedAnimal || mongoose.model("DetectedAnimal", DetectedAnimal);


