const Threads = require("../../../../models/forums");
const Tickets = require("../../../../models/tickets");
const moment = require("moment");

const index = async (fastify, options, done) => {
    fastify.get("/panel/mod", async (req, res) => {
        if (!(await req.user) || !req.client.config.mods.includes((await req.user).id)) return req.render("./handlers/error.liquid", { status: 404 }, 404);
        else {
            let threads = [];
            (await Threads.find().sort([["date", "descending"]]).limit(10)).map(th => {
                threads.push({
                    name: th.name,
                    id: th.id
                })
            })
            let tickets = [];
            await (await Tickets.find().sort([["date", "ascending"]])).map(async ticket => {
                tickets.push({
                    id: ticket.id,
                    name: ticket.name,
                    content: ticket.reason,
                    priority: ticket.priority,
                    category: ticket.category,
                    authorInfo: {
                        tag: (await req.client.users.fetch(ticket.author).catch(() => { })).tag,
                        id: ticket.author
                    },
                    date: moment(ticket.date).format("dddd, MMMM Do, h:mm:ss a"),
                    closed: ticket.closed
                })
            });
            return req.render("/panel/mod.liquid", { threads, tickets });
        }
    });

    done()
};

module.exports = index;