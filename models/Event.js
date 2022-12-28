const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        title:{
            type: String, 
            required: true, 
            unique: true
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
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true
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

module.exports = mongoose.model("Event", EventSchema);