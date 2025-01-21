const { Schema, model } = require("mongoose");

module.exports = model("users", new Schema({
    id: { type: String, required: true },
    biography: { type: String, default: "I am a mysterious person." },
    links: {
        github: "", facebook: "", twitter: "", instagram: ""
    },  
    banned: { type: Boolean, default: false }
}));