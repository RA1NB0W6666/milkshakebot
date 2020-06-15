const Discord = require('discord.js');
const fs = require('fs');
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  

    
  if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.RichEmbed().setColor("#FF69B4").setDescription("Gerekli iznin yok."))
  //if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  //let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  //if (db.has(`log_${message.guild.id}`) === false) return message.reply('Mod log kanalı ayarlanmamış');
  //let modlog = message.guild.channels.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setColor("#FF69B4").setDescription("Yasaklamak istediğiniz kullanıcıyı etiketleyin."));
  //if (reason.length < 1) return message.channel.send("Lütfen sebep giriniz");
  if (user.id === message.member.id) return message.channel.send(new Discord.RichEmbed().setColor("#FF69B4").setDescription('Kendini yasaklayamazsın.')); 
  if (user.id === "696303171986915358") return message.channel.send(new Discord.RichEmbed().setColor("#FF69B4").setDescription('Kendimi yasaklayamam.'));
  if (user.highestRole > message.member.highestRole) {
			return message.channel.send(new Discord.RichEmbed().setColor("#FF69B4").setDescription(`Bu kişinin rolü benim rolümden yüksek.`));
		}
  
  if (user.highestRole > message.author.highestRole) {
			return message.channel.send(new Discord.RichEmbed().setColor("#FF69B4").setDescription(`Yetkin var ama o kullanıcının rolü senin rolünden yüksek olduğu için yasaklayamam.`));
		}
  
  if (!message.guild.member(user).bannable) return message.channel.send(new Discord.RichEmbed().setColor("#FF69B4").setDescription(`Yasaklama yetkim yok.`));
  message.guild.ban(user, 2, reason);
  
  if (!reason) reason = "Sebep belirtilmemiş.";
  
  const embed2 = new Discord.RichEmbed()
  .setColor("#FF69B4")
  .setDescription(`<@${user.id}> sunucudan yasaklandı.\nSebep: ${reason}`)
  message.channel.send(embed2)

  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban", "banla"],
  permLevel: 0,
  kategori: "moderasyon",
};

exports.help = {
  name: 'yasakla',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};