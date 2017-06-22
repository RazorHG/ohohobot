var Discord = require('../node_modules/discord.io');
var fs = require('fs');
var _ = require('../node_modules/lodash');
var bot = new Discord.Client({
    token: "",
    autorun: true
});

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "!oho") {
        bot.sendMessage({
            to: channelID,
            message: "OHOHOHOHO! :laughing:"
        });
        var user = _.find(bot.users, { id: userID });
        var voiceChannelUserIsIn = _.find(bot.channels, function(channel) {
            return channel.type === "voice" && _.find(channel.members, { user_id: user.id });
        });
        if (voiceChannelUserIsIn) {
            console.log(user.username + "in" + voiceChannelUserIsIn.id);
            bot.joinVoiceChannel(voiceChannelUserIsIn.id, function() {
                console.log("joined " + voiceChannelUserIsIn.name);
                //Then get the audio context
                bot.getAudioContext(voiceChannelUserIsIn.id, function(error, stream) {
                    //Once again, check to see if any errors exist
                    if (error) return console.error(error);

                    fs.readdir("./sounds", function(err, items) {
                        var randomSoundFile = items[_.random(0, items.length - 1)];
                        //Create a stream to your file and pipe it to the stream
                        //Without {end: false}, it would close up the stream, so make sure to include that.
                        fs.createReadStream('sounds/' + randomSoundFile).pipe(stream, { end: false });

                        //The stream fires `done` when it's got nothing else to send to Discord.
                        stream.on('done', function() {
                            bot.leaveVoiceChannel(voiceChannelUserIsIn.id);
                        });
                    });

                });
            });
        }

    }
});