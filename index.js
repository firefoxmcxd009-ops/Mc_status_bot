const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// ---------- CONFIG ----------
const token = "8584566887:AAEI7OpsvG8-rq6bq6qO3s3BKqu64QidtSY"; // ដាក់ BOT TOKEN របស់អ្នក
const server = "dinomc.org"; // Minecraft server IP
const voteLink = "https://firefoxmckingdomstore.vercel.app/Rank%20Store"; // link server store

// ---------- INIT BOT ----------
const bot = new TelegramBot(token, { polling: true });

// ---------- /start ----------
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const text = `
សួស្ដី ${msg.from.first_name} 👋
Commands available:
/ip - show server IP
/players - show player list
/store - store link
/ping - server ping
/status - server online/offline
`;
    bot.sendMessage(chatId, text);
});

// ---------- /ip ----------
bot.onText(/\/ip/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `🌐 Server IP: ${server}`);
});

// ---------- /players ----------
bot.onText(/\/players/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        const res = await axios.get(`https://api.mcsrvstat.us/3/${server}`);
        const data = res.data;

        if (data.online) {
            let players = "No players online 😴";
            if (data.players.list) {
                players = data.players.list.join(", ");
            }
            bot.sendMessage(chatId, `👥 Players online (${data.players.online}/${data.players.max}):\n${players}`);
        } else {
            bot.sendMessage(chatId, "🔴 Server Offline");
        }

    } catch (err) {
        bot.sendMessage(chatId, "❌ Error fetching player list");
    }
});

// ---------- /store ----------
bot.onText(/\/store/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `�️ Store: ${voteLink}`);
});

// ---------- /ping ----------
bot.onText(/\/ping/, async (msg) => {
    const chatId = msg.chat.id;
    const start = Date.now();

    try {
        await axios.get(`https://api.mcsrvstat.us/3/${server}`);
        const latency = Date.now() - start;
        bot.sendMessage(chatId, `🏓 Server ping: ${latency} ms`);
    } catch (err) {
        bot.sendMessage(chatId, "❌ Server offline, cannot ping");
    }
});

// ---------- /status ----------
bot.onText(/\/status/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        const res = await axios.get(`https://api.mcsrvstat.us/3/${server}`);
        const data = res.data;

        if (data.online) {
            bot.sendMessage(chatId,
                `🟢 Server Online\n` +
                `Players: ${data.players.online}/${data.players.max}`
            );
        } else {
            bot.sendMessage(chatId, "🔴 Server Offline");
        }

    } catch (error) {
        bot.sendMessage(chatId, "❌ Error checking server");
    }
});
