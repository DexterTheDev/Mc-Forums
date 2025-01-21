const index = async (fastify, options, done) => {
    fastify.get("/thread/:id/report", async (req, res) => {
        if (!(await req.user)) res.redirect("/auth");
        else return req.render("/dynamic/threads/report.liquid")
    });
    done();
};

module.exports = index;