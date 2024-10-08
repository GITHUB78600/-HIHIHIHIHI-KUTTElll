const fs = require("fs-extra");
const axios = require("axios");

// Function to generate random message
function generateRandomMessage(messages) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

module.exports = {
  config: {
    name: "miss you",
    version: "1.0",
    author: "ARIF BABU",
    countDown: 5,
    role: 0,
    shortDescription: "no-prefix",
    longDescription: "Bot aapko hindi mein jawab dega",
    category: "non-prefix",
    guide: {
      en: "{p}{n}",
    }
  },

  onStart: async function ({ }) { },

  onChat: async function ({ api, event, args, Threads, userData }) {
    const { threadID, senderID } = event;
    // Fetch sender details
    const senderInfo = await api.getUserInfo(senderID);
    // Get sender name from sender details
    const senderName = senderInfo[senderID].name;

    // Trigger words and their corresponding replies and GIF links
    const triggers = {
      "good morning": {
        options: ["miss you", "miss", "MISS YOU", "MISS", "i miss you"],
        gifLinks: [
         "https://i.postimg.cc/GhDBGBkD/10.gif",

"https://i.postimg.cc/c4YqQ3Xf/11.gif",

"https://i.postimg.cc/6QQtL37w/12.gif",

"https://i.postimg.cc/xT0mDvhP/MISS-YOU.gif",          
          // Add more GIF links here as per your requirement
        ],
        replies: ["𝐈 𝐌𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎 😇, " + senderName + " 𝐌𝐀𝐑𝐈 𝐉𝐀𝐀𝐍 😘", "𝐈 𝐌𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎 😇, " + senderName + " 𝐌𝐀𝐑𝐈 𝐉𝐀𝐀𝐍 😘", "𝐈 𝐌𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎 😇, " + senderName + " 𝐌𝐀𝐑𝐈 𝐉𝐀𝐀𝐍 😘"]
      }
    };

    // Check if message body contains any trigger words
    for (const trigger in triggers) {
      if (triggers[trigger].options.some(option => new RegExp(`\\b${option}\\b`, 'i').test(event.body))) {
        const { gifLinks, replies } = triggers[trigger];

        // Generate random GIF link
        const gifLink = gifLinks[Math.floor(Math.random() * gifLinks.length)];
        // Generate random message
        const replyMessage = generateRandomMessage(replies);

        try {
          // Fetch GIF data
          const gifData = await axios.get(gifLink, { responseType: "stream" });
          // Send GIF and message as attachments
          api.sendMessage({
            attachment: gifData.data,
            body: replyMessage,
            mentions: [{ tag: senderID, id: senderID }]
          }, threadID);
        } catch (error) {
          console.error("GIF fetch karne mein error:", error);
        }

        return; // Message bhejne ke baad loop se bahar nikalna
      }
    }

    // Agar koi trigger word nahi milta, to kuch nahi karna
  }
};
