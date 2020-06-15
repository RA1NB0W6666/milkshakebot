const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")

exports.run = async (client, message, params, args) => {
 let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  const yardım1 = new Discord.RichEmbed()

    .setColor("#FF69B4")
    .addField("Bilgi Komutları", "`istatistik`, `ping`, `bilgi`")
  .addField("Yapılandırma","`prefix`")
    .addField("Yetkili Komutları", "`yavaş-mod`, `temizle`, `at`, `yasakla`")
    .addField(
      "Ses Komutları",
      "`çal`, `duraklat`, `oynatılan`, `geç`, `ses`, `gir`, `ayrıl`, `devam`, `radyo`"
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);

  return message.channel.send(yardım1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help", "yardom", "yatdım", "y", "h", "yardim"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Botun komutlarını gösterir.",
  usage: "yardım"
};
