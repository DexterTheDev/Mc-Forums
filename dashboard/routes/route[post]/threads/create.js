const Threads = require("../../../../models/forums");
const Users = require("../../../../models/users");

const index = async (fastify, options, done) => {

    fastify.post("/threads/:category/:type/create", async (req, res) => {
        if (!(await req.user)) return res.send({ error: true, message: "Sign in to continue" })
        let dbuser = await Users.findOne({ id: (await req.user).id });
        if (dbuser && dbuser.banned) return res.send({ error: true, message: "You are banned" })
        
        if (req.body.threadName.length < 3 || req.body.threadName.length > 32) res.send({ error: true, message: "Thread name can't be more than 32 or less than 3 charactars" })
        else if (req.body.threadContent.length < 120 || req.body.threadContent.length > 15000) res.send({ error: true, message: "Thread content can't be more than 15000 or less than 120 charactars" })
        else if (!req.body.Tos) res.send({ error: true, message: "You must accept our terms of service and privacy policy to continue" })
        else {
            let id = req.client.functions.RandomString(32);
            await new Threads({
                id,
                name: req.body.threadName,
                author: (await req.user).id,
                content: req.body.threadContent,
                type: req.params.type
            }).save();
            res.send({ error: false, message: "You thread has been created...", id })
        }

    });
    done();
};

module.exports = index;
