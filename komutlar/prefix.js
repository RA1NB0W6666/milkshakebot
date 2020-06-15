const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');


exports.run = async(client, message, args) => {

     if (!message.member.hasPermission("ADMINISTRATOR"))
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`Gerekli izin yok.`)
        .setColor("RED")
    );

  let prefix = args[0];
  
    if (args[0] === "sıfırla") {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (!prefix) {
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `Prefix zaten sıfırlanmış durumda.`
          )

          .setColor("RED")
      );
    }
    await db.delete(`prefix_${message.guild.id}`, prefix);
    message.channel.send(
      new Discord.RichEmbed()
        .setColor("#FF69B4")
        .setDescription("Prefix sıfırlandı.")
    );
    return;
  }

  if (!prefix) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription("Lütfen gecerli bir prefix girin.");

    message.channel.send(embed);
    return;
  }
   
 if (prefix.lenght > 5){
      return message.channel.send(new Discord.RichEmbed().setColor("RED").setDescription("Lütfen 5 veya daha düşük bir prefix girin."));
    };
    
  const embed = new Discord.RichEmbed()
    .setColor("#FF69B4")
    .setDescription(`Prefix'im \`${prefix}\` olarak değiştirildi.`);
  message.channel.send(embed);
  db.set(`prefix_${message.guild.id}`, prefix)
    
  }

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["önek"],
    permLevel: 2 ,
  kategori:'moderation'
};

exports.help = {
    name: "prefix",
    description: ".",
    usage: "prefix <value>"
};
   