const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const prefix = require("../ayarlar.json").prefix;
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  if(message.author.id !== "323171463832141826" && message.author.id !== "598781976459345920"){
 return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `<@${message.author.id}>, bu komutu sadece \`Sahibim/Geliştiricilerim\` kullanabilir.`
        )
        .setColor("#FF69B4")
    );
    }
  
  if (!args[0]) return message.reply("Lütfen komutun adını yazın.");
  console.log(args[0]);
  if (client.commands.get(args[0]))
    return message.reply(
      `Komut zaten yüklendi.  \`${prefix}reload\` komutunu kullanın.`
    );
  const cmdFiles = await readdir(`${process.cwd()}/komutlar/`);
  client.commandsNumber = cmdFiles.length;
  //client.log('log', `Yüklenen  ${client.commandsNumber} komutlardır.`, 'LOAD');
  var load = args[0];
  //cmdFiles.forEach(f => {
  //try {
  const props = require(`${process.cwd()}/komutlar/${load}`);
  //if (f.split('.').slice(-1)[0] !== 'js') return;
  client.log("log", `Yüklenen Komut: ${props.help.name}.`, "LOAD");
  client.commands.set(props.help.name, props);
  props.conf.aliases.forEach(alias => {
    client.aliases.set(alias, props.help.name);
  });
  //} catch (e) {
  //client.log('ERROR', `Komutu açık tut ${f}: ${e}`);
  //}
  //});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["loadcommand", "yüklekomut"],
  permLevel: 0
};

exports.help = {
  name: "yüklekomut",
  category: "Geliştirici",
  description: "Restart atmadan komutu reload layın.",
  usage: "yüklekomut [komutadı]"
};
