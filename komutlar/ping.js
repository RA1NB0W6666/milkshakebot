const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
module.exports.run = async (client, msg, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  let pingembed = new Discord.RichEmbed()
    .setColor("#FF69B4")
    .setDescription(`🏓Pong`);
  const message = msg;
  const m = await msg.channel.send(pingembed);
  let embed = new Discord.RichEmbed()
    .setColor("#FF69B4")
    .setDescription(`**Pong:** \`${Math.round(client.ping)}ms\``);
  m.edit({ embed });
};
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pong"],
  permLevel: 0
};

module.exports.help = {
  name: "ping",
  kategori: "myselector",
  description: "Botun pingini,pongunu gösteriri",
  usage: "ping"
};
