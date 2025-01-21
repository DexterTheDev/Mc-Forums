const moment = require("moment");
const Threads = require("../../../../models/forums")
const announce = require("../../../../models/news");
const Reports = require("../../../../models/reports");
const userReports = require("../../../../models/userReport");
const Tickets = require("../../../../models/tickets");
const index = async (fastify, options, done) => {

    fastify.get("/panel/admin", async (req, res) => {
        if (!(await req.user) || !req.client.config.admin.includes((await req.user).id)) return req.render("./handlers/error.liquid", { status: 404 }, 404);
        else {
            let announcements = announce.find().sort([["date", "descending"]]).limit(5)
            let reports = [];
            let userReps = [];
            let tickets = [];
            let threads = [];
            (await Threads.find().sort([["date", "descending"]]).limit(10)).map(th => {
                threads.push({
                    name: th.name,
                    id: th.id
                })
            })
    
            await (await Reports.find().sort([["date", "ascending"]])).map(async report => {
                reports.push({
                    id: report.id,
                    threadID: report.threadID,
                    content: report.content,
                    authorInfo: {
                        tag: (await req.client.users.fetch(report.author).catch(() => { })).tag,
                        id: report.author
                    },
                    date: moment(report.date).format("dddd, MMMM Do, h:mm:ss a"),
                    archived: report.archived
                })
            });
            await (await userReports.find().sort([["date", "ascending"]])).map(async report => {
                userReps.push({
                    id: report.id,
                    content: report.content,
                    authorInfo: {
                        tag: (await req.client.users.fetch(report.author).catch(() => { })).tag,
                        id: report.author
                    },
                    date: moment(report.date).format("dddd, MMMM Do, h:mm:ss a"),
                    archived: report.archived
                })
            });
            await (await Tickets.find().sort([["date", "ascending"]])).map(async ticket => {
                tickets.push({
                    id: ticket.id,
                    name: ticket.name,
                    content: ticket.reason,
                    priority: ticket.priority,
                    category: ticket.category,
                    authorInfo: {
                        tag: (await req.client.users.fetch(ticket.author).catch(() => { })).tag,
                        id: ticket.author
                    },
                    date: moment(ticket.date).format("dddd, MMMM Do, h:mm:ss a"),
                    closed: ticket.closed
                })
            });
            return req.render("/panel/admin.liquid", { threads, announcements, reports, userReps, tickets });
        }
    });

    done()
};

module.exports = index;