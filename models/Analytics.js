const mongoose = require("mongoose");

const Analytics = mongoose.Schema({
    short: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Analytics", Analytics);
