const Tickets = require("../../../../models/tickets");

const index = async (fastify, options, done) => {

    fastify.post("/tickets/create", async (req, res) => {
        if (!(await req.user)) return res.send({ error: true, message: "Sign in to continue" });
        let ticketCheck = await Tickets.findOne({ author: (await req.user).id });
        if (ticketCheck) return res.send({ error: true, message: "You can't make more than one ticket at the same time" });

        if (req.body.name.length < 3 || req.body.name.length > 32) res.send({ error: true, message: "Ticket name can't be more than 32 or less than 3 charactars" })
        else if (req.body.reason.length < 120 || req.body.reason.length > 15000) res.send({ error: true, message: "Ticket content can't be more than 15000 or less than 120 charactars" })
        else {
            let id = req.client.functions.RandomString(32);
            await new Tickets({
                id,
                name: req.body.name,
                author: (await req.user).id,
                reason: req.body.name,
                priority: req.body.priority,
                category: req.body.category
            }).save();
            return res.send({ error: false, message: "You ticket has been created...", id })
        }

    });
    done();
};

module.exports = index;
