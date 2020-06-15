const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(
    `[${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}] Tarihiyle Botumuz  Aktif, Tüm Komutlar yüklendi!`
  );
  console.log(`${client.user.username} adıyla sunuculara hizmet veriyor.`);
  client.user.setStatus("online");
  client.user.setActivity(`${prefix}yardım | ${client.guilds.size} sunucu`);
 //  client.user.setActivity(`Herkesten kesinti için özür diliyoruz.`);
  console.log(`${client.user.username} Botunun Oyun ismi ayarlandı!`);
  console.log(
    `${client.user.username} Adıyla ` +
      client.channels.size +
      ` adet kanala, ` +
      client.guilds.size +
      ` adet sunucuya ve ` +
      client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() +
      ` kullanıcıya hizmet veriliyor!`
  );
}; // bu alttaki bakım modu üzteki aktif modu okey? ok

/*const Moment = require("moment");
const Discord = require("discord.js");
const prefix = require("../ayarlar.json").prefix;
const DBL = require("dblapi.js");
module.exports = client => {
  console.log(`Bot ${client.user.username} ismi ile giriş yapıldı!`);

  const aktiviteListesi = [
    `Bakımda | ${client.guilds.size} sunucu`,
    `Bakımda | ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı`
  ];
  client.user.setStatus("idle");
  console.log(
    `Bot ` +
      client.channels.size +
      ` adet kanala, ` +
      client.guilds.size +
      ` adet sunucuya ve ` +
      client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() +
      ` kullanıcıya hizmet veriyor.`
  );

  setInterval(() => {
    const Aktivite = Math.floor(Math.random() * (aktiviteListesi.length - 0));
    client.user.setActivity(aktiviteListesi[Aktivite]);
  }, 5000);
};*/

