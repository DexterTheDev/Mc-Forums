const Reports = require("../../../../../models/userReport");

const index = async (fastify, options, done) => {

    fastify.post("/reports/user/delete", async (req, res) => {
        if (!(await req.user) || !req.client.config.admin.includes((await req.user).id)) res.send({ error: true, message: "Restricted area" })
        else {
            let report = await Reports.findOne({ id: req.body.id });
            if(!report) res.send({ error: true, message: "Unknow report" })
            else {
                report.deleteOne();
                res.send({ error: false, message: "Deleted succesfully!"})
            }
        }
    });
    done();
};

module.exports = index;