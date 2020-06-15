const express = require("express");
const app = express();

const http = require("http");
app.get("/", (request, response) => {
  console.log(`[PING] Açık tutuyorum...`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const ms = require("ms");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube("AIzaSyBV7xCJUmUQY29PXCd6U1gA9Zl3cBIxrCg");
const queue = new Map();
const { promisify } = require("util");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yükleniyor`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const DBL = require("dblapi.js");
//
const dbll = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjMwMzE3MTk4NjkxNTM1OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg3NjM5MTU4fQ.7HYoT_DbM2bK-8G1QhJijvSRkgVWhUybK_yni-lMAuM", client);new DBL(ayarlar.dbltoken, client);

dbll.on("posted", () => {
  console.log(`DBL istatistikleri gönderildi.`);
})

dbll.on("error", e => {
 console.log(`DBL istatistikleri gönderilemedi:\n${e}`);
})


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 10;
  return permlvl;
};
/////
client.on("message", message => {
  if(message.channel.type === "dm"){
    if(message.author.bot) return;

    let dmlog = new Discord.RichEmbed()
    .setColor("RED")
    .addField("Gönderen", `${message.author.tag}`, true)
    .addField("Gönderen ID", message.author.id, true)
    .addField("Gönderilen mesaj", message.content)
    client.channels.get("712258413387579412").send(dmlog)
    
  }  
});
var surum = require("./package.json").version;
const website = require("./ayarlar.json").website;

client.on("ready", () => {
  const moment = require("moment");
  require("moment-duration-format");

  setInterval(() => {
    let botdurum = client.channels.find(c => c.id === "696767076764876810");
    const botistatistik = new Discord.RichEmbed()
      .setColor("#FF69B4")
      .setDescription(
        `Ram: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )}**/512mb \nPing: **${
          client.ping
        }**\nVersiyon: **v${surum}**`
      );
    botdurum.send(botistatistik);
  }, 400000); //900000 milisaniye = 15dk rainbow
});
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("message", async msg => {
  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  if (msg.content.startsWith("-çal")) {
    const voiceChannel = msg.member.voiceChannel;
    let send = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(
        "Komutu kullanabilmek için bir ses kanalında bulunmalısın."
      );
    if (!voiceChannel) return msg.channel.send(send);

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlis(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); //
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel
        .send(new Discord.RichEmbed())
        .setTitle(`${playlist.title} adlı şarkı sıraya eklendi.`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;

          msg.channel.send(
            new Discord.RichEmbed()
              .setColor("#FF69B4")
              .setTitle("Şarkı Seçimi")
              .setDescription(
                `${videos
                  .map(video2 => `**${++index}** - ${video2.title}`)
                  .join("\n")}`
              )
              .setFooter(
                `Milkshake`,
                `https://cdn.discordapp.com/attachments/698870268986130492/698870338641199164/milkshake-bot-logo.jpg`
              )
              .setTimestamp()
              .setColor("#FF69B4")
          );
          msg.delete(5000);
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              new Discord.RichEmbed()
                .setColor("#FF69B4")
                .setDescription(
                  "10 saniye boyunca bir şarkı seçmediğiniz için komut iptal edildi. "
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send(
            new Discord.RichEmbed()
              .setColor("#FF69B4")
              .setDescription(`**YouTube'da böyle bir şarkı mevcut değil!**`)
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "gir") {
    return new Promise((resolve, reject) => {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== "voice")
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Komutu kullanabilmek için bir ses kanalına girmelisin."
            )
        );

      voiceChannel
        .join()
        .then(connection => resolve(connection))
        .catch(err => reject(err));
    });
  } else if (command === "ayrıl") {
    
    const voiceChannel = msg.member.voiceChannel;
    
    if (!msg.user.voiceChannel) return msg.channel.send(
      new Discord.RichEmbed()
        .setDescription(`Ayrılmam için bir kanalda bulunmam gerek.`)
        .setColor("RED"))
    
    msg.member.voiceChannel.leave();
    msg.channel.send(
      new Discord.RichEmbed()
        .setDescription(`**${voiceChannel.name}** adlı kanaldan ayrıldım.`)
        .setColor("#FF69B4")
    );
  } else if (command === "geç") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Komutu kullanabilmek için bir ses kanalında bulunmalısınız."
            )
        );

    if (!serverQueue)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor("#FF69B4")
          .setDescription("Şu anda herhangi bir şarkı oynatılmıyor.")
      );
    return;
  } else if (command === "ses") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Komutu kullanabilmek için bir ses kanalında bulunmalısınız."
            )
        );

    if (!client.v)
      if (!serverQueue)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Şarkı oynatılmıyor veya radyo dinliyorsunuz."
            )
        );

    if (args[1] > 200)
      return msg.channel.send(
        new Discord.RichEmbed().setColor("RED").setDescription(
          "Ses seviyesi 200'den fazla olamaz."
        )
      );
    if (args[1] > 1)
      return msg.channel.send(
        new Discord.RichEmbed().setColor("RED").setDescription(
          "Ses seviyesi 200'den fazla olamaz."
        )
      );

    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.send(
      new Discord.RichEmbed()
        .setTitle(`Ses seviyesi **${args[1]}** olarak ayarlandı.`)
        .setColor("#FF69B4")
    );
  } else if (command === "oynatılan") {
    if (!serverQueue)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setDescription("Şu an herhangi bir şarkı oynatılmıyor.")
          .setColor("#FF69B4")
      );
    return msg.channel.send(
      new Discord.RichEmbed()
        .setColor("#FF69B4")
        .setTitle("Oynatılan")
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
        .setFooter(client.user.username, client.user.avatarURL)
        .setTimestamp()
    );
  } else if (command === "sıra") {
    let index = 0;
    if (!serverQueue)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle("Herhangi bir şarkı sıraya eklenmemiş.")
          .setColor("#FF69B4")
      );
    return msg.channel
      .send(
        new Discord.RichEmbed()
          .setColor("#FF69B4")
          .setFooter(client.user.username, client.user.avatarURL)
          .setTitle("Şarkı Sırası")
          .setTimestamp()
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** [${song.title}](${song.url})`)
              .join("\n")}`
          )
      )
      .addField("**Oynatılan** " + `${serverQueue.songs[0].title}`);
  } else if (command === "duraklat") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send(
        new Discord.RichEmbed()
          .setDescription(":pause_button: | Şarkı durduruldu")
          .setColor("#FF69B4")
      );
    }
    return msg.channel.send(
      new Discord.RichEmbed()
        .setDescription("Şu anda herhangi bir şarkı oynatılmıyor.")
        .setColor("#FF69B4")
    );
  } else if (command === "devam") {
    if (serverQueue && serverQueue.playing)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setDescription("Şu an zaten bir şarkı oynatılmakta.")
          .setColor("#FF69B4")
      );

    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send(
        new Discord.RichEmbed()
          .setDescription(":arrow_forward: | Şarkı çalınmaya devam ediyor.")
          .setColor("#FF69B4")
      );
    }
    return msg.channel.send(
      new Discord.RichEmbed()
        .setTitle("Şu anda herhangi bir şarkı oynatılmıyor.")
        .setColor("#FF69B4")
    );
  }

  return;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`**Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
      queue.delete(msg.guild.id);
      return msg.channel.send(
        new Discord.RichEmbed()
          .setTitle(`Hata`)
          .setDescription(`Hata: **${error}**`)
          .setFooter("Destek: discord.gg/WxUZzHZ")
          .setColor("#FF69B4")
      );
    }
  } else {
    serverQueue.songs.push(song);
    if (playlist) return;
    return msg.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `Eklenen: **[${song.title}](${song.url})** \nEkleyen: <@${msg.author.id}>`
        )
        .setColor("#FF69B4")
    );
  }
  return;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(
    new Discord.RichEmbed()
      .setColor("#FF69B4")
      .setTitle("Oynatılan")
      .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
      .setDescription(`[${song.title}](${song.url})`, true)
      .addField("Ses Seviyesi", `%${serverQueue.volume}`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL)
  );
} 
