const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter name"]
    },
    email: {
        type: String,
        required: [true, "please enter email"]
    },
    subject: {
        type: String
    },
    message: {
        type: String,
        required: [true, "please enter message"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("form", formSchema);
