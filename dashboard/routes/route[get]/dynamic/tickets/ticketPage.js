const Tickets = require("../../../../../models/tickets");

const index = async (fastify, options, done) => {
    fastify.get("/ticket/:id", async (req, res) => {
        let ticket = await Tickets.findOne({ id: req.params.id });
        if (!ticket) return req.render("./handlers/error.liquid", { status: 404 }, 404);
        else if (req.client.config.admin.includes((await req.user).id) || req.client.config.mods.includes((await req.user).id) || (await req.user).id == ticket?.author) {
            let author = await req.client.users.fetch(ticket.author).catch(() => { });
            return req.render("/dynamic/tickets/ticketPage.liquid", {
                ticket: Object.assign(ticket, {
                    authorTag: author.tag,
                    authorAvatar: author.displayAvatarURL({ dynamic: true })
                })
            })
        }
        else return req.render("./handlers/error.liquid", { status: 404 }, 404);
    });
    done();
};

module.exports = index;