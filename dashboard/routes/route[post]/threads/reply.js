const Threads = require("../../../../models/forums");
const Users = require("../../../../models/users");
const index = async (fastify, options, done) => {

    fastify.post("/thread/:id/reply", async (req, res) => {
        if (!(await req.user)) return res.send({ error: true, message: "Sign in to continue" })
        let dbuser = await Users.findOne({ id: (await req.user).id });
        if (dbuser && dbuser.banned) return res.send({ error: true, message: "You are banned" })

        let thread = await Threads.findOne({ id: req.params.id });
        if (!thread) res.send({ error: true, message: "Unknow thread" })
        else if (thread.closed) res.send({ error: true, message: "Replies are closed to this thread!" })
        else if (req.body.content.length < 15 || req.body.content > 350) res.send({ error: true, message: "Reply content can't be more than 350 or less than 15 charactars" })
        else {
            let author = await req.client.users.fetch((await req.user).id).catch(() => { });
            let content = {
                id: (await req.user).id,
                tag: author.tag,
                avatar: author.displayAvatarURL({ dynamic: true }),
                content: req.body.content,
                date: Date.now()
            }
            thread.replies.push(content);
            await thread.save();

            res.send(Object.assign({ error: false, message: "You reply has been added" }, content))
        }
    });
    done();
};

module.exports = index;