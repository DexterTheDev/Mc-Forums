const { Client } = require("discord.js");
const config = require("./config.js");
const client = new Client({ disableMentions: "everyone", disabledEvents: ["TYPING_START"], intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const mongoose = require("mongoose");
const utils = require("./utils");
require('dotenv').config({ path: '.env' });

client.config = config;
client.functions = utils;

client.on("ready", async () => {
    require("./dashboard/index")(client);
    await mongoose.connect(client.config.mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return console.error(err);
        console.log(`${client.user.username} database is connected...`)
    });
    console.log(`${client.user.username} api gateaway is connected...`);
})

client.login(config.token)