const { Schema, model } = require("mongoose");

module.exports = model("forums", new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    replies: {
        type: Array, of: Object, default: [
            {
                id: "989255429567705109",
                tag: "MC Forums Bot",
                avatar: "https://cdn.discordapp.com/avatars/989255429567705109/a2b7fe847c642c0294d6599b665840b4.webp?size=240",
                content: "Make sure to follow our chatting guidelines",
                date: Date.now()
            }
        ]
    },
    views: { type: Number, default: 0 },
    closed: { type: Boolean, default: false },
    type: { type: String, required: true },
    date: { type: Number, default: Date.now() }
}));