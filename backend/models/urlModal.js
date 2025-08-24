const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    value: {
        type: String,
        required: [true, "please enter long url"]
    },
    key: {
        type: String,
        required: [true, "please define key"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("url", urlSchema);
