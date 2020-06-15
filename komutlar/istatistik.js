const Discord = require("discord.js");
const client = new Discord.Client();
const os = require('os');
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  
  //.toLocaleString()
  
  var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();
  
    //--------------------------//
  
    var osBit = await os.arch();
  
    if (osBit === 'x64') osBit = '64 Bit'
    else if (osBit === 'x82') osBit = '32 Bit'
    else osBit = os.arch();
  
  const duration = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");

  const istatistikozel = new Discord.RichEmbed()
    .setColor("#FF69B4")
    .setTitle("İstatistik")
    .addField("Gecikme", +client.ping + " ms ", true)
    .addField("Çalışma Süresi ", `${duration}`, true)
    .addField(
      "Kullanıcılar",
      client.guilds.reduce((a, b) => a + b.memberCount, 0),
      true
    )
    .addField("Kanallar", client.channels.size, true)
    .addField("Sunucular", client.guilds.size, true)
    .addField(
      "Bellek kullanımı",
      (+process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2) + "MB",
      true
    )
    .addField("Kütüphanesi", `Discord.js`, true)
    .addField(`Sürümü`, Discord.version, true)
    .addField(`Bağlı`, `${client.voiceConnections.size}`, true)
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp();

  message.channel.send(istatistikozel);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "i",
    "istatistikler",
    "botbilgi",
    "hakkında",
    "bot-hakkında",
    "bothakkında",
    "bilgi"
  ],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Bot ile ilgili bilgi verir.",
  usage: "istatistik"
};
