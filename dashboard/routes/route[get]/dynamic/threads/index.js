const Threads = require("../../../../../models/forums");

const index = async (fastify, options, done) => {

    fastify.get("/threads", async (req, res) => {
        let categories = [];
        let dbthreads = await Threads.find();
        let index = 0;
        Object.keys(req.client.config.categories).map((name, category) => {
            let threads = [];
            index++
            req.client.config.categories[name].map(thread => {
                threads.push({ icon: thread.icon, name: thread.name.charAt(0).toUpperCase() + thread.name.slice(1), count: dbthreads.filter(i => i.type == thread.name).length, index })
            });
            categories.push({ categoryName: name, threads })
        });
        return req.render("/dynamic/threads/index.liquid", { categories });
    });

    done()
};

module.exports = index;
