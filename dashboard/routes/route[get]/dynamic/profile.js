const Threads = require("../../../../models/forums");
const Users = require("../../../../models/users");
const Tickets = require("../../../../models/tickets")
const moment = require("moment");

const index = async (fastify, options, done) => {
    fastify.get("/profile", async (req, res) => {
        if (!(await req.user)) res.redirect("/auth");
        else {
            let dbuser = await Users.findOne({ id: (await req.user).id });
            let threads = [];
            let index = 0;
            let tickets = [];
            await (await Threads.find({ author: (await req.user).id })).map(async thread => {
                index++
                threads.push({ name: thread.name.charAt(0).toUpperCase() + thread.name.slice(1), id: thread.id, index })
            });

            if (!dbuser) dbuser = await new Users({
                id: (await req.user).id
            }).save()
            dbuser.tag = (await req.client.users.fetch((await req.user).id).catch(() => {})).tag;
            await (await Tickets.find({ author: (await req.user).id }).sort([["date", "ascending"]])).map(async ticket => {
                tickets.push({
                    id: ticket.id,
                    name: ticket.name,
                    content: ticket.reason,
                    authorInfo: {
                        tag: (await req.client.users.fetch(ticket.author).catch(() => { })).tag,
                        id: ticket.author
                    },
                    date: moment(ticket.date).format("dddd, MMMM Do, h:mm:ss a"),
                    closed: ticket.closed
                })
            });
            return req.render("/dynamic/profile.liquid", { avatar: (await req.client.users.fetch((await req.user).id).catch(() => { })).displayAvatarURL({ dynamic: true }), threads, dbuser, tickets })
        }
    });
    done();
};

module.exports = index;