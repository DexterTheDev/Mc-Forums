const { Schema, model } = require("mongoose");

module.exports = model("reports", new Schema({
    id: { type: String, required: true },
    threadID: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Number, default: Date.now() },
    archived: { type: Boolean, default: false }
}));
