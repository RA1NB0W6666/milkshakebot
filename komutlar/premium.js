const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

exports.run = async (client, message, args, author, params) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  let p = "/";
  let arg = args.slice(0).join(" ");

  if (!arg[0]) {
    const embed = new Discord.RichEmbed()
      .setColor("#dbaf51")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(
        "<:goldingot:698490553569902602> **Premium üye olmak için [bizimle](https://discord.gg/HTFMb5D) iletişime geç**"
      )
      .setFooter(
        "Milkshake Premium",
        `https://cdn.discordapp.com/attachments/698870268986130492/698870339848896634/milkshake-pro-bot.jpg`
      )
      .setTimestamp();
    message.channel.send({ embed });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 0
};

exports.help = {
  name: "premium",
  description: "Premium Üye Olursunuz!",
  usage: "premium"
};
