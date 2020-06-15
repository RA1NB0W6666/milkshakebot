const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = async (bot, message, args) => {
 if(message.author.id !== "323171463832141826" && message.author.id !== "598781976459345920"){
 return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<@${message.author.id}>, bu komutu sadece \`Sahibim/Geliştiricilerim\` kullanabilir.`
        )
        .setColor("#FF69B4")
    );
    }
  
/*  if (message.author.id != "598781976459345920")
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<@${message.author.id}>, bu komutu sadece \`Sahibim/Geliştiricilerim\` kullanabilir.`
        )
        .setColor("#FF69B4")
    );
*/
  let nesne = args[0];
  if (!nesne)
    return message.channel.send(
      "Bir kullanıcının etiketlemeden  IDsini  girmelisin!"
    );

  db.delete(`premium_${nesne}`);

  message.channel.send(
    new Discord.RichEmbed()
      .setDescription(`${nesne} artık premium değil.`)
      .setColor("#FF69B4")
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "premiumçıkar",
  description: "[Admin Komutu] Premiumdan çıkar",
  usage: "premiumçıkar <ID>"
};
