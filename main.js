var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

logger.info('Started');

// Initialize Discord Bot
const bot = new Discord.Client();

bot.on('disconnect', () => {
    logger.info('Disconnected');
});

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.tag);
});

function handleMoveMessage(message)
{
    var args = message.content.substring(1).split(' ');
    args = args.splice(1);

    const fromChannel = message.channel;
    const count = args[0];
    const toChannel = message.guild.channels.find('id', args[2]);

    //logger.info(message.member.roles);
    if(message.member.permissions.has('ADMINISTRATOR'))
    {
        message.channel.fetchMessages({limit: count}).then(messages => {
            for(var msg of messages.array().reverse())
            {
                if(!msg.author.bot)
                    toChannel.send(msg.member.displayName + ":\n" + msg.content);
            }

            for(var msg of messages.array().reverse())
            {
                if(!msg.author.bot)
                    msg.delete();
            }
        });
    }
    else
    {
        message.channel.send("ERROR 403: FORBIDDEN").then(msg => {
            setTimeout(() => { msg.delete() }, 3000);
        });
    }
}

const maxRandom = 50;
var randomCounter = Math.floor((Math.random() * maxRandom) + 1);

bot.on('message', message => {
    if(message.content.substring(0, 1) == '!')
    {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        message.delete().then(() => {
            if(!message.author.bot)
            {
                switch(cmd)
                {
                    //!move COUNT to CHANNELID
                    case 'move':
                        handleMoveMessage(message);
                        break;

                    case 'channelid':
                        message.channel.send("Channel ID: " + message.channel.id).then(msg => {
                            setTimeout(() => { msg.delete() }, 5000);
                        });
                }
            }
        });
    }
    else
    {
        if(message.author.id == '361581192635613184') //Viatrex
        {
            randomCounter -= 1;
            if(randomCounter <= 0)
            {
                logger.info(message.author.tag);
                message.channel.send("Fuck you Viatrex!");

                randomCounter = Math.floor((Math.random() * maxRandom) + 1);
            }
        }
        else if(message.author.id == '176810272512671744') //Booty
        {
            randomCounter -= 1;
            if(randomCounter <= 0)
            {
                logger.info(message.author.tag);
                message.channel.send("At Five Guys!");

                randomCounter = Math.floor((Math.random() * maxRandom) + 1);
            }
        }
        else if(message.author.id == '305228776814673925') //Gecko
        {
            randomCounter -= 1;
            if(randomCounter <= 0)
            {
                logger.info(message.author.tag);
                message.channel.send("So tired...");

                randomCounter = Math.floor((Math.random() * maxRandom) + 1);
            }
        }
    }
});

bot.login(auth.token);