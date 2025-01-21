const Users = require("../../../../../models/users");

const index = async (fastify, options, done) => {

    fastify.post("/reports/user/ban", async (req, res) => {
        if (!(await req.user)) res.send({ error: true, message: "Restricted area" })
        if (req.client.config.admin.includes((await req.user).id) || req.client.config.mods.includes((await req.user).id)) {
            let discordUser = await req.client.users.fetch(req.body.id).catch(() => { })
            if (!discordUser) res.send({ error: true, message: "Unknow discord user" })
            else {
                let user = await Users.findOne({ id: req.body.id });
                if (!user) user = await new Users({ id: req.body.id, banned: true })
                user.banned = true
                await user.save();
                res.send({ error: false, message: `${discordUser.username} has been ${user.banned ? "banned" : "unbanned"}` })
            }
        } else res.send({ error: true, message: "Restricted area" })
    });
    done();
};

module.exports = index;