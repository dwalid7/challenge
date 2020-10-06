const express = require('express');
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 3000 // port that the server is running on => localhost:3000
const db = require("./models/")
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload

function success(res, payload) {
    return res.status(200).json(payload)
}

app.get("/crew", async (req, res, next) => {
    try {
        const crew = await db.Crew.find({})
        return success(res, crew)
    } catch (err) {
        next({ status: 400, message: "failed to get crew" })
    }
})

app.post("/crew", async (req, res, next) => {
    try {
        const member = await db.Crew.create(req.body)
        return success(res, member);
    } catch (err) {
        next({ status: 400, message: "failed to create a new crew member" });
    }
});

app.put("/crew/:id", async (req, res, next) => {
    try {
        const crew = await db.Crew.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        return success(res, crew)
    } catch (err) {
        next({ status: 400, message: "failed to update crew" })
    }
})

app.delete("/crew/:id", async (req, res, next) => {
    try {
        await db.Crew.findByIdAndRemove(req.params.id)
        return success(res, "member deleted!")
    } catch (err) {
        next({ status: 400, message: "failed to delete member" })
    }
})

app.use((err, req, res, next) => {
    return res.status(err.status || 400).json({
        status: err.status || 400,
        message: err.message || "there was an error processing request",
    })
})


app.listen(PORT, () => {
    // listening on port 3000
    console.log(`listening on port ${PORT}`) // print this when the server starts
})