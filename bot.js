import TelegramBot from 'node-telegram-bot-api';
import { status } from 'minecraft-server-util';

const TOKEN = '8584566887:AAEI7OpsvG8-rq6bq6qO3s3BKqu64QidtSY';
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/ip/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Server IP: dinomc.org');
});

bot.onText(/\/status/, async (msg) => {
    try {
        const response = await status('dinomc.org', 25565);
        bot.sendMessage(msg.chat.id, `Server is Online ✅\nPlayers: ${response.players.online}/${response.players.max}`);
    } catch (err) {
        bot.sendMessage(msg.chat.id, 'Server is Offline ❌');
    }
});

bot.onText(/\/store/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Visit our store: https://yourstore.example.com');
});

console.log('Bot is running!');
