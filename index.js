// Telegram Bot with /ip, /status, /store commands

import TelegramBot from 'node-telegram-bot-api';

// Bot Token
const TOKEN = '8584566887:AAEI7OpsvG8-rq6bq6qO3s3BKqu64QidtSY';
const bot = new TelegramBot(TOKEN, { polling: true });

// /ip command
bot.onText(/\/ip/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Server IP: dinomc.org');
});

// /status command
bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Server Status: Online ✅');
});

// /store command
bot.onText(/\/store/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Visit our store: https://yourstore.example.com');
});

console.log('Bot is running!');
