const moment = require('moment-timezone');


module.exports.config = {

  name: "autotime",

  version: "2.0.0",

  role: 0,

  author: "Karan jalvanshi",//don't change the author kung ayaw mong ma pwetan!! 

  description: "Automatically sends messages based on set times.",

  category: "AutoTime",

  countDown: 3

};


module.exports.onLoad = async ({ api }) => {

  const arrayData = {

  "12:00:00 PM": {

        message: " good afternoon everyone don't forget to eat y'all lunch break🍛"


      },

      "06:00:00 AM": {

        message: "good morning everyone!!, have a nice morning🍞☕🌅"


      },

      "07:00:00 AM": {

        message: "don't forget to eat all breakfast!! 🍞☕🍛"


      },

      "08:00:00 AM": {

        message: "life update:"


      },

      "01:00:00 PM": {

        message: "dont forget to eat y'all launchbreak"


      },

      "03:00:00 PM": {

        message: "3:00 baj gaye kaha hai sab:"


      },

      "05:00:00 PM": {

        message: "5 Baj gaye jaldi jaldi chai pi lo tea time ho gaya"


      },

      "06:00:00 PM": {

        message: "To kaisa raha aaj ka din 🤔"


      },

      "08:00:00 PM": {

        message: "Dinner time ho gaya guy's jaldi jaldi khana kha lo sab"


      },

      "10:00:00 PM": {

        message: "Good night 😪😪"


      },

      "11:00:00 PM": {

        message: " MY OWNER ARIF BABU ♥️🙂"

      }, 

      "00:05:00": {

      message: "𝚃𝚑𝚒𝚜 𝚒𝚜 𝙰𝚞𝚝𝚘 𝚜𝚎𝚗𝚍 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚎𝚟𝚎𝚛𝚢 𝟻𝚖𝚒𝚗𝚞𝚝𝚎𝚜:"

      }

    // Add more messages for other times as needed

  };


  const checkTimeAndSendMessage = () => {

    const now = moment().tz('Asia/kolkata');

    const currentTime = now.format('hh:mm:ss A');


    const messageData = arrayData[currentTime];


    if (messageData) {

      const tid = global.db.allThreadData.map(i => i.threadID);

      tid.forEach(async (threadID, index) => {

        api.sendMessage({ body: messageData.message }, threadID);

      });

    }


    const nextMinute = moment().add(1, 'minute').startOf('minute');

    const delay = nextMinute.diff(moment());

    setTimeout(checkTimeAndSendMessage, delay);

  };


  checkTimeAndSendMessage();

};


module.exports.onStart = () => {};
