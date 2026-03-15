// ---------- IMPORTS ----------
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// ---------- CONFIG ----------
const token = "8584566887:AAEI7OpsvG8-rq6bq6qO3s3BKqu64QidtSY"; // Your bot token
const server = "dinomc.org"; // Minecraft server IP
const voteLink = "https://firefoxmckingdomstore.vercel.app/Rank%20Store"; // Store link

// ---------- INIT BOT ----------
const bot = new TelegramBot(token, { polling: true });

// ---------- ERROR HANDLING ----------
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

// ---------- HELPER FUNCTION ----------
async function fetchServerStatus() {
    try {
        const res = await axios.get(`https://api.mcsrvstat.us/3/${server}`);
        return res.data;
    } catch (err) {
        console.error("Error fetching server:", err.message);
        // Retry after 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            const res = await axios.get(`https://api.mcsrvstat.us/3/${server}`);
            return res.data;
        } catch (err2) {
            console.error("Retry failed:", err2.message);
            return null;
        }
    }
}

// ---------- /start ----------
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`[START] From ${msg.from.username || msg.from.first_name} (${chatId})`);
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
    console.log(`[IP] Request from ${chatId}`);
    bot.sendMessage(chatId, `🌐 Server IP: ${server}`);
});

// ---------- /players ----------
bot.onText(/\/players/, async (msg) => {
    const chatId = msg.chat.id;
    console.log(`[PLAYERS] Request from ${chatId}`);

    const data = await fetchServerStatus();
    if (!data) return bot.sendMessage(chatId, "❌ Error fetching server status");

    if (data.online) {
        let players = "No players online 😴";
        if (data.players && data.players.list && data.players.list.length > 0) {
            players = data.players.list.join(", ");
        }
        bot.sendMessage(chatId, `👥 Players online (${data.players.online}/${data.players.max}):\n${players}`);
    } else {
        bot.sendMessage(chatId, "🔴 Server Offline");
    }
});

// ---------- /store ----------
bot.onText(/\/store/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`[STORE] Request from ${chatId}`);
    bot.sendMessage(chatId, `🛒 Store: ${voteLink}`);
});

// ---------- /ping ----------
bot.onText(/\/ping/, async (msg) => {
    const chatId = msg.chat.id;
    console.log(`[PING] Request from ${chatId}`);
    const start = Date.now();

    try {
        await axios.get(`https://api.mcsrvstat.us/3/${server}`);
        const latency = Date.now() - start;
        bot.sendMessage(chatId, `🏓 Server ping: ${latency} ms`);
    } catch (err) {
        bot.sendMessage(chatId, "❌ Server offline, cannot ping");
        console.error(err);
    }
});

// ---------- /status ----------
bot.onText(/\/status/, async (msg) => {
    const chatId = msg.chat.id;
    console.log(`[STATUS] Request from ${chatId}`);

    const data = await fetchServerStatus();
    if (!data) return bot.sendMessage(chatId, "❌ Error fetching server status");

    if (data.online) {
        bot.sendMessage(chatId,
            `🟢 Server Online\nPlayers: ${data.players.online}/${data.players.max}`
        );
    } else {
        bot.sendMessage(chatId, "🔴 Server Offline");
    }
});

// ---------- LOG ----------
console.log("🤖 Bot is running...");
