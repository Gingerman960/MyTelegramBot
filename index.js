var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = '515255033:AAGWfth0abUy4GUIuSXmArjjfGoHTgFQxYk';
var url = 'https://api.telegram.org/bot<' + token + '>/getFile?file_id=<';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

var subscribers = [
    333165771,
    353880219,
    310107378,
    325300025,
    436915753,
    80736721,
    425883532
];

function sendMessage(text) {
    subscribers.forEach(function (id) {
        bot.sendMessage(id, text);
    })
}
function sendMessagePhoto(photo) {
    subscribers.forEach(function (id) {
        bot.sendPhoto(id, photo);
    });
}
function sendSingleMessagePhoto(photo) {
    bot.sendPhoto(212741986, photo);
    bot.sendPhoto(431542827, photo);
}
function sendSingleMessage(text) {
    bot.sendMessage(212741986, text);
    bot.sendMessage(431542827, text);
}
if (subscribers.length > 0) {
    sendSingleMessage(subscribers[0], 'Hello My Dear friend!');
}

// Простая команда без параметров.
bot.on('message', function (msg) {
    if((!subscribers.includes(msg.from.id)) && msg.from.id !== 212741986 && msg.from.id !== 431542827) {
        subscribers.push(msg.from.id);
    }
    if(msg.from.id === 212741986 || msg.from.id === 431542827) {
        if(msg.photo) {
            sendMessagePhoto(msg.photo[3].file_id);
        } else {
            sendMessage(msg.text);
        }
    } else {
        console.log(msg);
        if(msg.photo) {
            sendSingleMessagePhoto(msg.photo[3].file_id);
        } else {
            sendSingleMessage(msg.text + '\n from: ' + msg.from.last_name + ' ' + msg.from.first_name );
        }

    }
});