const Threads = require("../../../../models/forums");
const Users = require("../../../../models/users");

const index = async (fastify, options, done) => {

    fastify.post("/thread/:id/edit", async (req, res) => {
        if (!(await req.user)) return res.send({ error: true, message: "Sign in to continue" })

        let dbuser = await Users.findOne({ id: (await req.user).id });
        if (dbuser && dbuser.banned) return res.send({ error: true, message: "You are banned" })

        let thread = await Threads.findOne({ id: req.params.id });
        if (!thread) res.send({ error: true, message: "Unknow thread" })
        else if (req.body.threadName.length < 3 || req.body.threadName.length > 32) res.send({ error: true, message: "Thread name can't be more than 32 or less than 3 charactars" })
        else if (req.body.threadContent.length < 120 || req.body.threadContent.length > 15000) res.send({ error: true, message: "Thread content can't be more than 15000 or less than 120 charactars" })
        else if (!req.body.Tos) res.send({ error: true, message: "You must accept our terms of service and privacy policy to continue" })
        else {
            thread.name = req.body.threadName;
            thread.author = (await req.user).id;
            thread.content = req.body.threadContent;
            thread.closed = req.body.closed;
            await thread.save();
            res.send({ error: false, message: "You thread has been modified...", id: thread.id })
        }

    });
    done();
};

module.exports = index;