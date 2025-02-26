const oauth2 = require('@fastify/oauth2')
const config = require("../../../../config");

const discordoauth2 = (fastify, options, done) => {

    fastify.register(oauth2, {
        name: 'discordOAuth2',
        credentials: {
            client: {
                id: config.clientID,
                secret: config.clientSecret
            },
            auth: oauth2.DISCORD_CONFIGURATION
        },
        scope: ['identify', 'guilds', "guilds.join"],
        startRedirectPath: '/auth',
        callbackUri: `${config.domain}/callback`
    })

    fastify.get('/callback', async function (request, reply) {
        const token = await this.discordOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

        request.session.set('access_token', token.token.access_token)
        request.session.set('token_type', token.token.token_type)

        
        reply.redirect("/");
    });

    fastify.get("/logout", async function (request, reply) {
        await request.session.delete();
        reply.redirect("/");
    })
    done();
}
module.exports = discordoauth2;