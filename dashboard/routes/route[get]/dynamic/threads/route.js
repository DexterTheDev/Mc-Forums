const moment = require("moment");
const Threads = require("../../../../../models/forums");

const index = async (fastify, options, done) => {

    fastify.get("/threads/:category/:type", async (req, res) => {
        let threads = [];
        let index = 0;
        await (await Threads.find({ type: req.params.type }).sort([['date', "descending"]])).map(async thread => {
            index++
            threads.push({
                id: thread.id,
                name: thread.name,
                author: (await req.client.users.fetch(thread.author).catch(() => { })).tag,
                created: moment(thread.date).format("dddd, MMMM Do, h:mm:ss a"),
                views: thread.views,
                closed: thread.closed, index
            })
        })
        return req.render("/dynamic/threads/route.liquid", { threads, type: req.params.type, category: req.params.category });
    });

    done()
};

module.exports = index;
