const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    var error_permissions = new Discord.RichEmbed()
      .setDescription(
        `Gerekli iznin yok.`
      )
      .setColor("#FF69B4");
    message.channel.send(error_permissions);
  }
  const member = message.mentions.members.first();
  if (!member)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("Atmak için bir kullanıcıyı etiketleyin.")
        .setColor("#FF69B4")
    );

  member
    .kick()
    .then(member => {
      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `<:yes:697044224545259530> **${member.user.tag}** sunucudan atıldı.`
          )
          .setColor("GREEN")
      );
    })
    .catch(err => {
      // An error happened
      // This is generally due to the bot not being able to kick the member,
      // either due to missing permissions or role hierarchy
      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `<:no:697044224666763324> Kullanıcıyı atmaya iznim yok veya atacağım kullanıcının rolü benim rolümden yüksek.`
          )
          .setColor("RED")
      );
    });
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "at",
  kategori: "moderasyon",
  description: "Etiketlediğiniz üyeyi sunucudan atar.",
  usage: "at <@kullanıcı>"
};
