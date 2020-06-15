const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()

    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(
      `Botu davet etmek için **[tıkla](https://top.gg/bot/696303171986915358)**\nDestek sunucusuna katılmak için **[tıkla](https://discord.gg/mfkvfJs)**`
    )
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setColor(`#FF69B4`)
    .setTimestamp();

  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "",
  usage: "davet"
};
