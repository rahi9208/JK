let Twit = require('twit');
module.exports = {

        'klklkl': new Twit({
            consumer_key: process.env.SIGMA_TWITTER.klklkl.consumerKey,
            consumer_secret: process.env.SIGMA_TWITTER.klklkl.consumerSecret,
            access_token: process.env.SIGMA_TWITTER.klklkl.accessToken,
            access_token_secret: process.env.SIGMA_TWITTER.klklkl.accessTokenSecret
        }),
};