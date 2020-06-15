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
  
  if (!args[0]) return message.reply('Reload layacağım komutu yazmalaısın');

	let command;
	if (client.commands.has(args[0])) {
		command = client.commands.get(args[0]);
	} else if (client.aliases.has(args[0])) {
		command = client.commands.get(client.aliases.get(args[0]));
	}
	if (!command) return message.reply(` \`${args[0]}\` komut veya alternatifler bulunamadı. Tekrar Dene!`);
	command = command.help.name;

	delete require.cache[require.resolve(`./${command}.js`)];
	const cmd = require(`./${command}`);
	client.commands.delete(command);
	client.aliases.forEach((cmd, alias) => {
		if (cmd === command) client.aliases.delete(alias);
	});
	client.commands.set(command, cmd);
	cmd.conf.aliases.forEach(alias => {
		client.aliases.set(alias, cmd.help.name);
	});
let oldu = `\`${command}\` adlı komut reload landı`

var başarı = new Discord.RichEmbed()
.setColor("#FF69B4")
.setDescription(oldu)
.setAuthor(message.author.username, message.author.avatarURL)
.setFooter(client.user.username, client.user.avatarURL)
	message.reply(başarı);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'reload',
	category: 'Sistem',
	description: 'Komutları reload la',
	usage: 'reload [komut]'
};
  