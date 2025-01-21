const moment = require("moment");
const Tickets = require("../../../../models/tickets");

const index = async (fastify, options, done) => {

    fastify.post("/tickets/reply/:id", async (req, res) => {
        if (!(await req.user)) return res.send({ error: true, message: "Sign in to continue" });
        let ticket = await Tickets.findOne({ id: req.params.id });
        if (!ticket) return res.send({ error: true, message: "You can't participate at this chat" });
        else if (req.client.config.admin.includes((await req.user).id) || req.client.config.mods.includes((await req.user).id) || (await req.user).id == ticket?.author) {
            if (req.body.content.length < 4 || req.body.content.length > 3500) res.send({ error: true, message: "Reply content can't be more than 3500 or less than 4 charactars" })
            else {
                let id = req.client.functions.RandomString(32);
                let author = await req.client.users.fetch((await req.user).id).catch(() => { });
                let reply = {
                    id,
                    author: (await req.user).id, content: req.body.content, plainDate: moment(Date.now()).format("dddd, MMMM Do, h:mm a"),
                    authorData: {
                        tag: author.tag,
                        avatar: author.displayAvatarURL({ dynamic: true })
                    }
                }
                ticket.chat.push(reply);
                await ticket.save();
                return res.send({
                    error: false, message: "You ticket has been created...", reply
                })
            }
        } else return res.send({ error: true, message: "You can't participate at this chat" });
    });
    done();
};

module.exports = index;
