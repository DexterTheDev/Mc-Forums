const Tickets = require("../../../../models/tickets");

const index = async (fastify, options, done) => {

    fastify.post("/tickets/delete", async (req, res) => {
        if (!(await req.user) || !req.client.config.admin.includes((await req.user).id)) res.send({ error: true, message: "Restricted area" })
        else {
            let ticket = await Tickets.findOne({ id: req.body.id });
            if (!ticket) res.send({ error: true, message: "Unknow ticket" })
            ticket.deleteOne();
            res.send({ error: false, message: "Deleted succesfully!" })
        }
    });
    done();
};

module.exports = index;
