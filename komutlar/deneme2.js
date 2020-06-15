const Discord = require("discord.js");

module.exports.run = async (bot, message, args, data) => {
        let prefix = args[0];
        if(!prefix) return message.channel.send("Prefixinizin ne olacağını söyleyin.");
        await data.guild.prefixSet(prefix);
        message.channel.send(`<:yes:697044224545259530> Prefix: **${prefix}**`);
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "deneme2",
  description: "-",
  usage: "deneme2"
};
