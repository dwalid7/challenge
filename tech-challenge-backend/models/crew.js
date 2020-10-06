const mongoose = require("mongoose");

const crewSchema = new mongoose.Schema({
    crew: {
        type: String,
        required: true,
    }
})

const crewModel = mongoose.model("Crew", crewSchema)

module.exports = crewModel 