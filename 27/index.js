const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('./config');

const app = express();

/*
*  This bot uses webhooks to send updates to the server when new messages sent to it
*  
*  Set webhook:
*  https://api.telegram.org/bot1207168805:AAGbUWWD-KQwrxCT6B0zFR4Lvf_x7ZeQ8J0/setWebhook?url=https://telegram-bot-cwp-27.herokuapp.com/update
*/

app.use(bodyParser.json());

app.post('/send', (request, response) => {
    sendMessage(request.body.message);
    response.end();
});

app.post('/update', (request, response) => {
    sendMessage(request.body.message)
    response.end();
});

app.listen(process.env.PORT || config.server.port, () => {
    console.log(`Listening to https://telegram-bot-cwp-27.herokuapp.com/`);
});

function sendMessage(message) {
    return axios.post(config.bot.apiUrl + config.bot.token + '/sendMessage', {
        chat_id: message.chat.id || config.bot.defaultChatId,
        text: message.text
    });
}
