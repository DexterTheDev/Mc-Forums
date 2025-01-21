const Reports = require("../../../../models/userReport");
const Users = require("../../../../models/users");

const index = async (fastify, options, done) => {

    fastify.post("/profile/:id/report", async (req, res) => {
        if (!(await req.user)) return res.send({ error: true, message: "Sign in to continue" })

        let dbuser = await Users.findOne({ id: (await req.user).id });
        if (dbuser && dbuser.banned) return res.send({ error: true, message: "You are banned" })
        let user = await Users.findOne({ id: req.params.id });
        if (!user) res.send({ error: true, message: "Unknow user" })
        else if (req.body.content.length < 25 || req.body.content.length > 5000) res.send({ error: true, message: "Report content can't be more than 5000 or less than 25 charactars" })
        else {
            await new Reports({
                id: req.params.id,
                author: (await req.user).id,
                content: req.body.content
            }).save();
            res.send({ error: false, message: "You report has been added to review...", id: req.params.id })
        }

    });
    done();
};

module.exports = index;