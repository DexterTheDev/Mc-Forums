module.exports = {
    token: "", // Discord bot token
    mongodb: '', // Mongodb cloud db link
    port: 3000,
    clientID: "",
    clientSecret: "",
    domain: "http://localhost:3000",
    logs: "", // Errors log channel discord
    support: "", // Discord invitelink
    guildID: "", // Main discord guild ID
    mods: [],  // People who can access the mod panel
    admin: [""], // People who can access the admin panel
    SiteName: "MC Forums", // Site name
    siteDesc: "MC Forums is a forum-based thread with many topics you can start discussing with vast threads/profiles, join us now!",
    categories: {
        "discord": [
            { name: "desktop applications", icon: `<i class="fa-solid fa-display-code"></i>` },
            { name: "discord Discussion", icon: `<i class="fa-brands fa-discord"></i>` },
            { name: "discord Servers", icon: `<i class="fa-solid fa-server"></i>` },
            { name: "discord Bots", icon: `<i class="fa-solid fa-message-bot"></i>` },
            { name: "discord templates", icon: `<i class="fa-solid fa-file"></i>` },
            { name: "discord.js", icon: `<i class="fa-brands fa-js"></i>` }
        ],
        "developments": [
            { name: "programming", icon: `<i class="fa-solid fa-computer-classic"></i>` },
            { name: "web developments", icon: `<i class="fa-solid fa-browser"></i>` },
        ],
        "others": [
            { name: "General Discussion", icon: `<i class="fa-solid fa-message-captions"></i>` },
            { name: "talking", icon: ` <i class="fa-solid fa-bullhorn"></i>` },
            { name: "games", icon: `<i class="fa-solid fa-gamepad-modern"></i>` },
            { name: "cheats", icon: `<i class="fa-solid fa-fire-smoke"></i>` },
            { name: "showcase", icon: `<i class="fa-solid fa-camera"></i>` },
        ]
    }
    // Thread topics ^
}
