const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  //  if (message.author.id != "598781976459345920") return message.reply('Bunu Sadece Sahibim Kullanabilir');
  if (
    message.author.id !== "323171463832141826" &&
    message.author.id !== "598781976459345920"
  ) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<@${message.author.id}>, bu komutu sadece \`Sahibim/Geliştiricilerim\` kullanabilir.`
        )
        .setColor("#FF69B4")
    );
  }

  if (args[0].length < 1)
    return message.channel.send(
      "`Geliştiricim/Sahibim` yazı girmeyi unuttun; yorgunluktan herhalde."
    );

  const embed = new Discord.RichEmbed()
    .setColor("#FF69B4")
    .setDescription(
      "`Geliştiricim` **#duyurular** adlı kanala duyurunuzu attım."
    );
  message.channel.send(embed);

  const embed2 = new Discord.RichEmbed()
    .setColor("#FF69B4")
    .setTitle(args[0])
    .setDescription(args[1]);
  client.channels.get("696767133308158104").send(embed2);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "embed",
  description: "Embed şeklinde yazı yaz.",
  usage: "embed"
};
