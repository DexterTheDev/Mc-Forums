const Threads = require("../../../../../models/forums");

const index = async (fastify, options, done) => {
    fastify.get("/thread/:id/edit", async (req, res) => {
            if (!(await req.user)) res.redirect("/auth");
            else {
                let thread = await Threads.findOne({ id: req.params.id });
                if (!thread) return req.render("./handlers/error.liquid", { status: 404 }, 404);
                else if(thread.author !== (await req.user).id) return req.render("./handlers/error.liquid", { status: 404 }, 404);
                else {
                    let th = {
                        id: thread.id,
                        name: thread.name,
                        author: thread.author,
                        content: thread.content,
                        replies: thread.replies,
                        views: thread.views,
                        closed: thread.closed,
                        type: thread.type,
                        date: thread.date,
                      };
                    return req.render("/dynamic/threads/edit.liquid", { thread: th })
                }
            }
    });
    done();
};

module.exports = index;
