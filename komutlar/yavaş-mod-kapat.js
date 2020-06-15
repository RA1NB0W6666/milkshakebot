const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if(args[0] === "kapat"){
  var request = require("request");
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: 0
    },
    headers: {
      Authorization: `Bot ${client.token}`
    }
  });
  message.channel.send(
    new Discord.RichEmbed()
      .setDescription("<:yes:697044224545259530> yavaş-mod kapatıldı.")
      .setColor("GREEN")
  );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mosssssde", "slossssssssssssswmode", "sssssssyavas-mod", "yavasssssssssmod", "ssssss"],
  permLevel: 0
};

exports.help = {
  name: "syavaş-sssmod",
  description: "ssssSohbetteki süreli yazma sınırını kapatır.",
  usage: "yavaş-mod <0-120>"
};
