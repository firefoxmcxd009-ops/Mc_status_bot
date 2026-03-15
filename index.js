import TelegramBot from 'node-telegram-bot-api';
import { status } from 'mcstatus';

// Bot Token
const TOKEN = '8584566887:AAEI7OpsvG8-rq6bq6qO3s3BKqu64QidtSY';
const bot = new TelegramBot(TOKEN, { polling: true });

// /ip command
bot.onText(/\/ip/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Server IP: dinomc.org');
});

// /store command
bot.onText(/\/store/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Visit our store: https://yourstore.example.com');
});

// /status command (Pro version: dynamic ping)
bot.onText(/\/status/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        const res = await status('dinomc.org'); // default port 25565
        const motd = res.description?.text || 'No MOTD';
        const players = `${res.players.online}/${res.players.max}`;
        const version = res.version.name;

        const message = `🎮 Server Status: Online ✅\n📜 MOTD: ${motd}\n👥 Players: ${players}\n⚙️ Version: ${version}`;
        bot.sendMessage(chatId, message);
    } catch (err) {
        bot.sendMessage(chatId, 'Server Status: Offline ❌');
    }
});

console.log('Pro Minecraft Bot is running!');
