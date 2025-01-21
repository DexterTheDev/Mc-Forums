const Reports = require("../../../../models/reports");
const Threads = require("../../../../models/forums");

const index = async (fastify, options, done) => {

    fastify.post("/reports/deleteThread", async (req, res) => {
        if (!(await req.user) || !req.client.config.admin.includes((await req.user).id)) res.send({ error: true, message: "Restricted area" })
        else {
            let report = await Reports.findOne({ id: req.body.id });
            let thread = await Threads.findOne({ id: report.threadID || req.body.id });
            if (!thread) res.send({ error: true, message: "Unknow thread" })
            thread.deleteOne();
            if (report) report.deleteOne();
            res.send({ error: false, message: "Deleted succesfully!" })
        }
    });
    done();
};

module.exports = index;
