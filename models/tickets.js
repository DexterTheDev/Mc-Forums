const { Schema, model } = require("mongoose");

module.exports = model("tickets", new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    reason: { type: String, required: true },
    chat: {
        type: Array, of: Object, default: []
    },
    closed: { type: Boolean, default: false },
    priority: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Number, default: Date.now() }
}));