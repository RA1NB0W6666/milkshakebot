module.exports = member => {
  let username = member.user.username;
  member.send(`${username}, sunucuya hoş geldin.`);
  member.guild.defaultChannel.send("");
};
