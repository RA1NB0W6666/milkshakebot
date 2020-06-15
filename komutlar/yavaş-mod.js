const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")

exports.run = async (client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      new Discord.RichEmbed().setColor("RED").setDescription(
        `<@${message.author.id}> bu komutu **Mesajları Yönet** yetkisine sahip yetkililer kullanabilir.`
      )
    );
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
      .setDescription("<:yes:697044224545259530> Yavaş mod kapatıldı.")
      .setColor("GREEN")
  )
    return;
  }
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var embed = new Discord.RichEmbed()
      .setDescription(`<:no:697044224666763324> Süre limiti yok. Lütfen \`1\` veya \`120\` arası bir sayı belirtin.`)
      .setColor("RED");
    message.channel.send({ embed });
    return;
  }
  if (limit > 120) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          "<:no:697044224666763324> Süre limiti maksimum `120` saniye olabilir."
        )
        .setColor("RED")
    );
  }

  if (limit < 1) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(
          "<:no:697044224666763324> Süre limiti en düşük `1` saniye olabilir "
        )
    );
  }
  
  if (isNaN(args[0]))
    return message.channel.send(
      new Discord.RichEmbed().setColor("RED").setDescription("Lütfen geçerli bir sayı girin.")
    );
  
  message.channel.send(
    new Discord.RichEmbed()
      .setDescription(
        `<:yes:697044224545259530> Kullanıcılar artık **${limit}** saniyede bir mesaj atabilir.`
      )
      .setColor("GREEN")
  );
  var request = require("request");
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    },
    headers: {
      Authorization: `Bot ${client.token}`
    }
  });
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "slowmode", "yavas-mod", "yavasmod"],
  permLevel: 0
};

exports.help = {
  name: "yavaş-mod",
  description: "Sohbete süreli yazma sınırı ekler.",
  usage: "yavaş-mod <0-120>"
};
