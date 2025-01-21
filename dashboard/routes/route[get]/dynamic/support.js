const index = async(fastify, options, done) => {
    fastify.get("/support", async(req, res) => {
        return req.render("/dynamic/tickets/index.liquid")
    });
    done()
};

module.exports = index;