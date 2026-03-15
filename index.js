// import library
import TelegramBot from 'node-telegram-bot-api';
import mcstatus from 'mcstatus';

// Bot Token
const TOKEN = '8584566887:AAEI7OpsvG8-rq6bq6qO3s3BKqu64QidtSY';
const bot = new TelegramBot(TOKEN, { polling: true });

// /status command
bot.onText(/\/status/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        // ping Minecraft server
        const status = await mcstatus.status('dinomc.org');
        bot.sendMessage(chatId, `Server is Online ✅\nPlayers: ${status.players.online}/${status.players.max}\nVersion: ${status.version.name}`);
    } catch (err) {
        bot.sendMessage(chatId, 'Server is Offline ❌');
    }
});

// /ip command
bot.onText(/\/ip/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Server IP: dinomc.org');
});

// /store command
bot.onText(/\/store/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Visit our store: https://yourstore.example.com');
});

console.log('Bot is running!');
