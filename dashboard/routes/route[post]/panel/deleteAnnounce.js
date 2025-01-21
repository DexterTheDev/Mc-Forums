const announcements = require("../../../../models/news");

const index = async (fastify, options, done) => {

    fastify.post("/announcement/delete", async (req, res) => {
        if (!(await req.user) || !req.client.config.admin.includes((await req.user).id)) res.send({ error: true, message: "Restricted area" })
        else {
            let announce = await announcements.findOne({ id: req.body.id });
            if(!announce) res.send({ error: true, message: "Unknow announcement" })
            else {
                announce.deleteOne();
                res.send({ error: false, message: "Deleted succesfully!"})
            }
        }
    });
    done();
};

module.exports = index;
