const Threads = require("../../../../models/forums");
const Users = require("../../../../models/users");

const index = async (fastify, options, done) => {

    fastify.post("/profile/:id", async (req, res) => {
        if (!(await req.user)) res.redirect("/auth");
        else {
            let dbuser = await Users.findOne({ id: req.params.id });
            let threads = [];
            let index = 0;
            await (await Threads.find({ author: req.params.id })).map(async thread => {
                index++
                threads.push({ name: thread.name.charAt(0).toUpperCase() + thread.name.slice(1), id: thread.id, index })
            });

            if (!dbuser) dbuser = await new Users({
                id: req.params.id
            }).save()
            dbuser.biography = req.body.content;
            dbuser.save();
            dbuser.tag = (await req.client.users.fetch(req.params.id).catch(() => { })).tag
            return req.render("/dynamic/profile.liquid", { avatar: (await req.client.users.fetch(req.params.id).catch(() => { })).displayAvatarURL({ dynamic: true }), threads, dbuser })
        }
    });
    done();
};

module.exports = index;