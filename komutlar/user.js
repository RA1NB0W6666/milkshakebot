const Discord = require("discord.js");
const moment = require("moment");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db")
const client = new Discord.Client();

exports.run = async (bot, msg, args) => {
  let prefix = (await db.fetch(`prefix_${msg.guild.id}`)) || ayarlar.prefix;
  
  let simdikitarih = moment.utc(msg.createdAt).format("DD MM YYYY");

  let user = msg.mentions.users.first() || msg.author;

  let userinfo = {};
  userinfo.avatar = user.displayAvatarURL;
  userinfo.id = user.id;
  userinfo.od1 =
    msg.guild.members.get(user.id).user.presence.game ||
    "Oynadığı bir oyun yok.";
  userinfo.status = user.presence.status
    .toString()
    .replace("dnd", `<:dnd:701743279640805376> Rahatsız Etmeyin`)
    .replace("online", `<:online:701743279670165595> Çevrimiçi`)
    .replace("idle", `<:idlee:701743279452061697> Boşta`)
    .replace("offline", `<:ofline:701743279401861161> Çevrimdışı`);

  userinfo.bot = user.bot
    .toString()
    .replace("false", `Hayır`)
    .replace("true", `Evet`);

  userinfo.sonmesaj =
    user.lastMessage ||
    "Son yazılan mesaj bulunamadı." ||
    "Son yazılan mesaj gösterilemedi.";

  userinfo.dctarih = moment
    .utc(msg.guild.members.get(user.id).user.createdAt)
    .format("**YYYY** [yılında] MMMM [ayında] dddd [gününde] (**DD/MM/YYYY**)")

    .replace("Monday", `**Pazartesi**`)
    .replace("Tuesday", `**Salı**`)
    .replace("Wednesday", `**Çarşamba**`)
    .replace("Thursday", `**Perşembe**`)
    .replace("Friday", `**Cuma**`)
    .replace("Saturday", `**Cumartesi**`)
    .replace("Sunday", `**Pazar**`)
    .replace("January", `**Ocak**`)
    .replace("February", `**Şubat**`)
    .replace("March", `**Mart**`)
    .replace("April", `**Nisan**`)
    .replace("May", `**Mayıs**`)
    .replace("June", `**Haziran**`)
    .replace("July", `**Temmuz**`)
    .replace("August", `**Ağustos**`)
    .replace("September", `**Eylül**`)
    .replace("October", `**Ekim**`)
    .replace("November", `**Kasım**`)
    .replace("December", `**Aralık**`);
  userinfo.dctarihkatilma = moment
    .utc(msg.guild.members.get(user.id).joinedAt)
    .format("**YYYY** [yılında] MMMM [ayında] dddd [gününde] (**DD/MM/YYYY**)")

    .replace("Monday", `**Pazartesi**`)
    .replace("Tuesday", `**Salı**`)
    .replace("Wednesday", `**Çarşamba**`)
    .replace("Thursday", `**Perşembe**`)
    .replace("Friday", `**Cuma**`)
    .replace("Saturday", `**Cumartesi**`)
    .replace("Sunday", `**Pazar**`)

    .replace("January", `**Ocak**`)
    .replace("February", `**Şubat**`)
    .replace("March", `**Mart**`)
    .replace("April", `**Nisan**`)
    .replace("May", `**Mayıs**`)
    .replace("June", `**Haziran**`)
    .replace("July", `**Temmuz**`)
    .replace("August", `**Ağustos**`)
    .replace("September", `**Eylül**`)
    .replace("October", `**Ekim**`)
    .replace("November", `**Kasım**`)
    .replace("December", `**Aralık**`);

  const profil = new Discord.RichEmbed()
    .setDescription(`<@${user.id}>`)
    .setColor("#FF69B4")
    .setAuthor(user.tag, userinfo.avatar)
    .setTitle("Bilgi")
    .addField(`Oyun`, userinfo.od1, false)
    .setThumbnail(userinfo.avatar)
    .addField(`Durum`, userinfo.status, false)
    .addField(`Katılım Tarihi (Sunucu)`, userinfo.dctarihkatilma, false)
    .addField(`Katılım Tarihi (Discord)`, userinfo.dctarih, false)
    .addField(`Kimlik`, userinfo.id, true)
    .addField(`Bot`, userinfo.bot, true)
    .addField(
      `Rol(ler)`,
      `${msg.guild.members
        .get(user.id)
        .roles.filter(r => r.name !== "@everyone")
        .map(r => r)
        .join(" **|** ") || "**Bu kullanıcıda hiçbir rol bulunmuyor**"}`,
      false
    );
  //.addField(`Son Mesaj`, userinfo.sonmesaj, false);
  msg.channel.send(profil);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["userinfo", "ub", "k", "profil", "kullanıcı"],
  permLevel: 0
};

exports.help = {
  name: "profil",
  description: "Sizin veya belirttiğiniz kullanıcının bilgilerini gösterir.",
  usage: "profil veya -profil <kullanıcı>"
};
