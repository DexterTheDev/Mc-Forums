const Threads = require("../../../../models/forums");
const Reports = require("../../../../models/reports");
const Users = require("../../../../models/users");

const index = async (fastify, options, done) => {

    fastify.post("/thread/:id/report", async (req, res) => {
        if (!(await req.user)) return res.send({ error: true, message: "Sign in to continue" })

        let dbuser = await Users.findOne({ id: (await req.user).id });
        if (dbuser && dbuser.banned) return res.send({ error: true, message: "You are banned" })
        let thread = await Threads.findOne({ id: req.params.id });
        if (!thread) res.send({ error: true, message: "Unknow thread" })
        else if (req.body.content.length < 25 || req.body.content.length > 5000) res.send({ error: true, message: "Thread content can't be more than 5000 or less than 25 charactars" })
        else {
            await new Reports({
                id: req.client.functions.RandomString(10),
                threadID: thread.id,
                author: (await req.user).id,
                content: req.body.content
            }).save();
            res.send({ error: false, message: "You report has been added to review...", id: thread.id })
        }

    });
    done();
};

module.exports = index;
