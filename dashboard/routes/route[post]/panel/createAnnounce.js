const announcements = require("../../../../models/news");

const index = async (fastify, options, done) => {

    fastify.post("/announcement/create", async (req, res) => {
        if (!(await req.user) || !req.client.config.admin.includes((await req.user).id)) res.send({ error: true, message: "Restricted area" })
        else {
            await new announcements({
                content: req.body.content,
                id: req.client.functions.RandomString(10),
                author: (await req.user).id
            }).save()
            res.send({ error: false, message: "Added succesfully!"})
        }
    });
    done();
};

module.exports = index;
