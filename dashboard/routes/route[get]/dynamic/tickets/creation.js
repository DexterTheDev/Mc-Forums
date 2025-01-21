
const index = async (fastify, options, done) => {
    fastify.get("/support/ticket", async (req, res) => {
        return req.render("/dynamic/tickets/creation.liquid")
    });
    done();
};

module.exports = index;