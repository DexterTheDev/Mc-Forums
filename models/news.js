const { Schema, model } = require("mongoose");

module.exports = model("news", new Schema({
    id: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Number, default: Date.now() }
}));