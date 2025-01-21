const Threads = require("../../../models/forums");
const announce = require("../../../models/news");;
const Users = require("../../../models/users");

const index = async (fastify, options, done) => {

    fastify.get("/", async (req, res) => {
        console.log(await req.user)
        let announcements = [];
        (await announce.find().sort([["date", "descending"]]).limit(5)).map(async announcement => {
            announcements.push({
                content: announcement.content,
                author: (await req.client.users.fetch(announcement.author).catch(() => {})).tag
            })
        })
        let threads = [];
        (await Threads.find().sort([["date", "descending"]]).limit(5)).map(th => {
            threads.push({
                name: th.name,
                id: th.id
            })
        })


        return req.render("index.liquid", { threads, announcements, users: await (await Users.find()).length });
    });

    done()
};

module.exports = index;