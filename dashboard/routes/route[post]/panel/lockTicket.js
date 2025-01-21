const Tickets = require("../../../../models/tickets");

const index = async (fastify, options, done) => {

    fastify.post("/tickets/lock", async (req, res) => {
        if (!(await req.user) || !req.client.config.admin.includes((await req.user).id)) res.send({ error: true, message: "Restricted area" })
        else {
            let ticket = await Tickets.findOne({ id: req.body.id });
            if (!ticket) res.send({ error: true, message: "Unknow ticket reload the page" })
            else if (ticket.closed) {
                ticket.closed = false;
                await ticket.save();
                res.send({ error: false, message: "Unlocked succesfully!" })
            } else {
                ticket.closed = true;
                await ticket.save();
                res.send({ error: false, message: "Locked succesfully!" })
            }
        }
    });
    done();
};

module.exports = index;