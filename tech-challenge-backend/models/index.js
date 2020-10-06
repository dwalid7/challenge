const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/challenge-app", {
    // connecting to the mongodb database name: "challenge-app" locally
    keepAlive: true, // keeping the connection alive
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Crew = require("./crew") // requiring the todo model that we just created in mongodb