const Discord = require("discord.js");

exports.run = function(client, message, args) {
   if(message.author.id !== "323171463832141826" && message.author.id !== "598781976459345920"){
 return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<@${message.author.id}>, bu komutu sadece \`Sahibim/Geliştiricilerim\` kullanabilir.`
        )
        .setColor("#FF69B4")
    );
    }
  message.channel
    .send(
      new Discord.RichEmbed()
        .setDescription("<:yes:697044224545259530> **Bot yeniden başlatılıyor**")
        .setColor("GREEN")
    )
    .then(msg => {
      console.log("Bot Yeniden başlatılıyor.");
      process.exit(0);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "reboot",
  description: "Botu yeniden başlatır.",
  usage: "reboot"
};
