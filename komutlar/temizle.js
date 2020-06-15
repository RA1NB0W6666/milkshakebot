const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")
exports.run = function(client, message, args) {
  var prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      new Discord.RichEmbed().setDescription(
        `<@${message.author.id}> bu komutu **Mesajları Yönet** yetkisine sahip yetkililer kullanabilir.`
      )
    );
  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed().setDescription(
        "**Lütfen silinecek mesaj miktarını yazın.**"
      )
    );
  if (args[0] > 100)
    return message.channel.send(
      new Discord.RichEmbed().setDescription(
        "Lütfen **100** veya daha düşük bir sayı girin."
      )
    );

  if (isNaN(args[0]))
    return message.channel.send(
      new Discord.RichEmbed().setDescription("Lütfen geçerli bir sayı girin.")
    );

  message.channel
    .bulkDelete(args[0])
    .then(messages =>
      message.channel.send(
        new Discord.RichEmbed().setColor("GREEN").setDescription(
          `<:yes:697044224545259530> \`${messages.size}\` adet mesaj silindi.`
        )
      )
    )
    .catch(console.error)
    .then(msg => msg.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil"],
  permLevel: 0
};

exports.help = {
  name: "temizle",
  kategori: "yetkili",
  description: "Belirlenen miktarda mesajı siler.",
  usage: "temizle <silinicek-mesaj-sayısı>"
};
