const index = async (fastify, options, done) => {
    fastify.get("/profile/:id/report", async (req, res) => {
        if (!(await req.user)) res.redirect("/auth");
        else return req.render("/dynamic/userReport.liquid")
    });
    done();
};

module.exports = index;