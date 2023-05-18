require('dotenv').config();
const WebSocket = require('ws');

const websocketUrl = process.env.CHATROOM_URL;
const websocket = new WebSocket(websocketUrl);
const dataSocketManager = require('./dataSocket');

var userTabsLive = new Map();

// consume the websocket. split by message and pass down
exports.readChatroom = async () => {
    websocket.addEventListener("message", (event) => {
        // console.log("message received"); //, event.data);
        processMessage(event.data);
    });
}

// process each message. pass to the database
async function processMessage(message) {
    let messageWords = message.split(' ');
    let user = messageWords[0].replaceAll(' ', '');
    user = user.replaceAll(':', '');
    
    // decrement word count to ignore username
    let wordCount = messageWords.length - 1;
    updateUserTabs(user, wordCount);
}

function updateUserTabs(user, wordCount) {
    if (userTabsLive.has(user)) {
        userTabsLive.set(user, userTabsLive.get(user) + wordCount);
    } else {
        userTabsLive.set(user, wordCount);
    }

    // todo - sort by word count
    let sortedUserTab = new Map([...userTabsLive.entries()].sort((a, b) => b[1] - a[1]));
    userTabsLive = sortedUserTab;

    // this is where i would persist the data
    // and maybe also read it from db on start if this was a real app

    // console.log("current : ", userTabsLive);
    dataSocketManager.newUserTab(sortedUserTab);
}

exports.getLiveData = function() {
    // console.log("live data: ", userTabsLive);
    return userTabsLive;
}