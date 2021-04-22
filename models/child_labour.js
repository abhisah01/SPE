const mongoose = require("mongoose");

const labourSchema = new mongoose.Schema({                             // layout of child-labour form schema
    fullname: {
        type: String,
        required: [true, "No name given!"]
    },
    email: String,
    phone: {
        type: Number,
      //  min: 10,
      //  max: 12,
        required: [true,"No contact number given!"]                     // Validators check to see that info is given by user
    },
    state: String,
    district: String,
    landmark: String,
    filename: String,
    description: String
});

module.exports =  Labour = mongoose.model("Labour", labourSchema);                  // creating a model for child-labour schema