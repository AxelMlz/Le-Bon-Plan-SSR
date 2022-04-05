const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    heroName: {
        type: String,
        required: true,
        maxLength: 30,
    },
    power: {
        type: Array,
        required: true,
    },
    color: {
        type: String,
        required: true,
        maxLength: 30,
    },
    isAlive:{ 
        type: Boolean,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
})

const Logs = mongoose.model("Logs", logSchema);

// exporter le modèle
module.exports = Logs;