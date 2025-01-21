const Threads = require("../../../../../models/forums");

const index = async (fastify, options, done) => {
  fastify.get("/thread/:id", async (req, res) => {
    let thread = await Threads.findOne({ id: req.params.id });
    if (!thread)
      return req.render("./handlers/error.liquid", { status: 404 }, 404);
    else {
      thread.views += 1;
      await thread.save();

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
      let author = await req.client.users.fetch(thread.author).catch(() => {});
      th.authorInfo = {
        username: author.username,
        avatar: author.displayAvatarURL({ dynamic: true }),
      };
      return req.render("/dynamic/threads/thread.liquid", { thread: th });
    }
  });

  done();
};

module.exports = index;
