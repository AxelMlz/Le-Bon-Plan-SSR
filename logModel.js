const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength : 50
    }
})

const Logs = mongoose.model("Logs", logSchema);

// exporter le modèle
module.exports = Logs;