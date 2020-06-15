const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args, config, author, params) => {
  let kullanıcı = await db.fetch(`premium_${message.author.id}`);

  if (kullanıcı == undefined) {
    message.reply("**Maalesef bu komut premium üyelere özeldir. :(**");
  } else {
    if (kullanıcı == "premium") {
      let p = "/";
      let arg = args.slice(0).join(" ");

      if (!arg[0]) {
        const embed = new Discord.RichEmbed()
          .setColor("#FF69B4")
          .setAuthor(message.author.username, message.author.avatarURL)
          .addField("bu bir denemedir.", "Tamammı")
          .setFooter("Deneme | Premium Özellik");
        message.channel.send({ embed });
      }
    }
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ssssssssss"],
  permLevel: 10
};

exports.help = {
  name: "sssss",
  description: "Zengin Geldi Hop.",
  usage: "deneme"
};
