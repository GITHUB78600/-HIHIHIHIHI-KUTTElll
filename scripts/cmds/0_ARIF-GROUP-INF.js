const fs = require("fs-extra");
const request = require("request");

module.exports = {
config: {
    name: "groupinf",
    aliases: ['boxinf'],
    version: "1.0",
    author: "xemon",
    countDown: 5,
    role: 0,
    shortDescription: "See Box info",
    longDescription: "",
    category: "box chat",
    guide: {
      en: "{p} [groupinfo|boxinfo]",
    }
  },

 onStart: async function ({ api, event, args }) {
  let threadInfo = await api.getThreadInfo(event.threadID);
  var memLength = threadInfo.participantIDs.length;
  let threadMem = threadInfo.participantIDs.length;
  var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
     for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      var nName = threadInfo.userInfo[z].name;
        if(gioitinhone == "MALE"){gendernam.push(z+gioitinhone)}
        else if(gioitinhone == "FEMALE"){gendernu.push(gioitinhone)}
            else{nope.push(nName)}
    };
  var nam = gendernam.length;
    var nu = gendernu.length;
   var listad = '';
   var qtv2 = threadInfo.adminIDs;
  let qtv = threadInfo.adminIDs.length;
  let sl = threadInfo.messageCount;
  let u = threadInfo.nicknames;
  let icon = threadInfo.emoji;
  let threadName = threadInfo.threadName;
  let id = threadInfo.threadID;
   for (let i = 0; i < qtv2.length; i++) {
const infu = (await api.getUserInfo(qtv2[i].id));
const name = infu[qtv2[i].id].name;
    listad += '•' + name + '\n';
  }
  let sex = threadInfo.approvalMode;
      var pd = sex == false ? 'Turned off' : sex == true ? 'Turned on' : 'Kh';
      var callback = () =>
        api.sendMessage(
          {
            body: `╭•┄┅═══❁🌺❁═══┅┄•╮\n     आरिफ़-बाबू!!🖤\n╰•┄┅═══❁🌺❁═══┅┄•╯ \n  🌺  [ 1 ]  𒁍 GROUP NAME   → ${threadName}\n🌺  [ 2 ]  𒁍 GROUP NO.   → ${id}\n🌺  [ 3 ]  𒁍 APPROVAL   → ${pd}\n🌺  [ 4 ]  𒁍 EMOJI   → ${icon}\n🌺  [ 5 ]  𒁍  MEMBERS  → ${threadMem}\n🌺  [ 6 ]  𒁍  MALES  → ${nam}\n🌺  [ 7 ]  𒁍  FEMALES  →  ${nu}\n🌺  [ 8 ]  𒁍  TOTAL ADMIN  → ${qtv} \n╭•┄┅═══❁🌺❁═══┅┄•╮\n  🌸   𝐀𝐑𝐈𝐅-𝐁𝐀𝐁𝐔  🌸\n╰•┄┅═══❁🌺❁═══┅┄•╯`,
            attachment: fs.createReadStream(__dirname + '/cache/1.jpg')
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + '/cache/1.jpg'),
          event.messageID
        );
      return request(encodeURI(`${threadInfo.imageSrc}`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.jpg'))
        .on('close', () => callback());
 }
};
