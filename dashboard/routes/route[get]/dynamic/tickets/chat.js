const Tickets = require("../../../../../models/tickets");

const index = async (fastify, options, done) => {
    fastify.get("/ticket/:id/chat", async (req, res) => {
        let ticket = await Tickets.findOne({ id: req.params.id });
        if (ticket) res.send({ error: false, chat: await ticket.chat });
        else res.send({ error: true, message: "Error occured please refresh the page" })

        return res;
    });
    done();
};

module.exports = index;