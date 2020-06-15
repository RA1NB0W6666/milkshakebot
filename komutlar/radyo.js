const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json");

const radyo = {
  alem: "http://scturkmedya.radyotvonline.com/stream/80/",
  ahaber: "applehttp://trkvz-radyo.ercdn.net/ahaberradyo/playlist.m3u8",
  cnnturk: "https://radyo.dogannet.tv/cnnturk",
  fenomen: "http://fenomen.listenfenomen.com/fenomen/128/icecast.audio",
  virgin: "http://www.canliradyolar.org/wp-content/themes/shopstudio/player/virgin-radio.html#",
  kral: "http://46.20.3.204/",
  kralpop: "http://46.20.3.201/;",
  line: "http://radioline.fm:8000/",
  metro: "http://17773.live.streamtheworld.com/METRO_FM_SC",
  radyod: "http://radyo.dogannet.tv/radyod",
  superfm: "http://17733.live.streamtheworld.com/SUPER_FM_SC",
  slow: "https://radyo.dogannet.tv/slowturk",
  JoyFm:
    "https://playerservices.streamtheworld.com/api/livestream-redirect/JOY_FM.mp3",
  show: "http://46.20.3.229/;",
  taksimclup: "http://cast1.taksim.fm:8016",
  
  bloomberg: "https://mn-nl.mncdn.com/bloomberghtradyo/bloomberghtradyo/playlist.m3u8",
  damarfm: "http://yayin.damarfm.com:8080/;",
  damartürk: "http://185.9.37.59:7966/;stream.mp3 "
};
exports.run = function(bot, message, args) {
  var prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if (!message.member.voiceChannel)
    return message.channel.send(
      new Discord.RichEmbed()
        .setColor("#FF69B4")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.avatarURL)
        .setDescription(
          "**Sana radyoyu dinletmem için ilk önce sesli bir kanala katılmalısın.**"
        )
    );
  else {
    if (!args[0] || args[0] === "help" || args[0] === "yardım") {
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle("Radyo")
          .setDescription(
            "```1   -  AlemFM  \n2   -  CnnTurkFM\n3   -  FenomenFM \n4   -  KralFM\n5   -  KralPopFM\n6   -  LineFM\n7   -  MetroFM\n8   -  RadyoDFM\n9   -  SuperFM\n10  -  SlowTurk\n11  -  JoyFM\n12  -  FenomenTURK\n13  -  SlowFm\n14  -  TaksimClup\n15  -  A Haber\n16  -  Damar FM\n17  -  Damar Türk\n18  -  Bloomberg HT\n19  -  Virgin Radyo (Çalışmıyor)```"
          )
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setTimestamp()
          .setColor("#FF69B4")
      );
    } else if (args[0].toLowerCase() === "alem" || args[0] === "1") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.alem);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **AlemFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
      
      } else if (args[0].toLowerCase() === "virgin" || args[0] === "19") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.virgin);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **Virgin Radyo** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
      
      } else if (args[0].toLowerCase() === "ahaber" || args[0] === "15") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.ahaber);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **A Haber** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "cnn" || args[0] === "2") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.cnnturk);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **CNNTurk** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "fenomen" || args[0] === "3") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.fenomen);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **FenomenFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "kral" || args[0] === "4") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.kral);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **KralFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "kralpop" || args[0] === "5") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.kralpop);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **KralPOP** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "line" || args[0] === "6") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.line);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **LineFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "metro" || args[0] === "7") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.metro);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **MetroFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "radyod" || args[0] === "8") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.radyod);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **Radyo D FM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "super" || args[0] === "9") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.superfm);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **SüperFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "slow" || args[0] === "10") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.slow);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **SlowTürk FM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "Joy" || args[0] === "11") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.JoyFm);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **JoyFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "FENOMEN TURK" || args[0] === "12") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.fenomenfm);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **FenomenTürk** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "show" || args[0] === "13") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.show);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **ShowFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "taksimclup" || args[0] === "14") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.taksimclup);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **TaksimClubFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    } else if (args[0].toLowerCase() === "damarfm" || args[0] === "16") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.show);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **DamarFM** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    }  else if (args[0].toLowerCase() === "damartürk" || args[0] === "17") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.show);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **Damar Türk** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    }else if (args[0].toLowerCase() === "bloomberg" || args[0] === "18") {
      message.member.voiceChannel.join().then(connection => {
        var dispatcher = connection.playStream(radyo.show);
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription("🎶 | Şu anda **Bloomberg HT** çalınıyor.")
            .setColor("#FF69B4")
        );
      });
    }  else if (
      args[0].toLowerCase() === "kapat" ||
      args[0].toLowerCase() === "bitir"
    ) {
      message.member.voiceChannel.leave();
      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `**${message.member.voiceChannel.name}** adlı kanaldan ayrıldım.`
          )
          .setColor("#FF69B4")
      );
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["radyo"],
  permLevel: 0
};

exports.help = {
  name: "radyo",
  description: "",
  usage: "radyo"
};
