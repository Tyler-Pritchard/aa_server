const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema(
    {
        title:{
            type: String, 
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        featured: {
            type: Boolean
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Instructor", InstructorSchema);