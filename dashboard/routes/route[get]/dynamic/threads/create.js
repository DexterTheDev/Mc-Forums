const index = async (fastify, options, done) => {
    fastify.get("/threads/:category/:type/create", async (req, res) => {
        if (req.client.config?.categories[req?.params?.category]?.filter(thread => thread.name.toLowerCase() == req.params.type.toLowerCase()).length > 0){
            if (!(await req.user)) res.redirect("/auth");
            else return req.render("/dynamic/threads/create.liquid", { type: req.params.type, category: req.params.category })
        } else return req.render("./handlers/error.liquid", { status: 404 }, 404);
    });
    done();
};

module.exports = index;
