require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const { Telegraf } = require("telegraf");
const { TEXT_POLLS, IMAGE_POLLS } = require("./polls");

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error("Missing BOT_TOKEN. Add it in your Render environment variables.");
  process.exit(1);
}

const bot = new Telegraf(TOKEN);
const app = express();
const PORT = Number(process.env.PORT || 10000);
const INTERVAL_HOURS = Math.max(1, Number(process.env.POLL_INTERVAL_HOURS || 4));
const INTERVAL_MS = INTERVAL_HOURS * 60 * 60 * 1000;
const ADMIN_IDS = new Set((process.env.ADMIN_IDS || "").split(",").map(x => x.trim()).filter(Boolean));
const CONFIG_PATH = path.join(__dirname, "config.json");

let groupChatId = process.env.GROUP_CHAT_ID || null;
let lastPollKey = null;
let pollCount = 0;

function saveConfig() {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ groupChatId }, null, 2));
  } catch (error) {
    console.warn("Could not save local config:", error.message);
  }
}

try {
  if (!groupChatId && fs.existsSync(CONFIG_PATH)) {
    groupChatId = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8")).groupChatId || null;
  }
} catch (error) {
  console.warn("Could not read config.json:", error.message);
}

function isAdmin(ctx) {
  return ADMIN_IDS.has(String(ctx.from?.id || ""));
}

function choosePoll() {
  const useImage = IMAGE_POLLS.length > 0 && Math.random() < 0.35;
  const source = useImage ? IMAGE_POLLS : TEXT_POLLS;
  let item;
  for (let attempt = 0; attempt < 8; attempt++) {
    item = source[Math.floor(Math.random() * source.length)];
    const key = (item.question || "") + (item.caption || "");
    if (key !== lastPollKey || source.length === 1) {
      lastPollKey = key;
      break;
    }
  }
  return { ...item, isImage: useImage };
}

async function sendPoll(chatId, announce = true) {
  const item = choosePoll();
  if (item.isImage) {
    try {
      await bot.telegram.sendPhoto(chatId, item.image, { caption: item.caption });
    } catch (error) {
      console.error("Image delivery failed; sending the poll without its image:", error.message);
    }
  }
  await bot.telegram.sendPoll(chatId, item.question, item.options, {
    is_anonymous: true,
    allows_multiple_answers: false,
    type: "regular"
  });
  pollCount += 1;
  console.log(`Poll #${pollCount} sent to ${chatId} (${item.isImage ? "image" : "text"})`);
  return item;
}

bot.start(async ctx => {
  await ctx.reply(
    "⚽ Welcome to SoccerFan Poll Bot!\n\n" +
    "I bring football debates, quizzes and image polls to your group every " + INTERVAL_HOURS + " hours.\n\n" +
    "Add me to your football group and make me an admin with permission to send messages, photos and polls.\n\n" +
    "Group admins: use /setgroup to connect this group. Use /poll to post a poll now."
  );
});

bot.help(ctx => ctx.reply(
  "⚽ SoccerFan Poll Bot Help\n\n" +
  "/setgroup — Connect this group (configured bot admins only)\n" +
  "/poll — Post a poll immediately (configured bot admins only)\n" +
  "/status — Check the bot's group and schedule\n" +
  "/help — Show this message\n\n" +
  "Automatic polls are sent every " + INTERVAL_HOURS + " hours. Image polls are followed by a Telegram voting poll."
));

bot.command("setgroup", async ctx => {
  if (!isAdmin(ctx)) return ctx.reply("Only the bot owner/admins configured in ADMIN_IDS can connect a group.");
  if (ctx.chat.type === "private") return ctx.reply("Run /setgroup inside the Telegram group you want me to post in.");
  groupChatId = String(ctx.chat.id);
  saveConfig();
  await ctx.reply("✅ This group is now connected! I'll post a football poll every " + INTERVAL_HOURS + " hours. Make sure I can send messages, photos and polls.");
  console.log("Connected group:", groupChatId);
});

bot.command("poll", async ctx => {
  if (!isAdmin(ctx)) return ctx.reply("This command is restricted to configured bot admins.");
  const target = ctx.chat.type === "private" ? groupChatId : String(ctx.chat.id);
  if (!target) return ctx.reply("No group connected yet. Add me to your group and run /setgroup there.");
  try {
    await sendPoll(target);
    if (ctx.chat.type === "private") await ctx.reply("✅ Poll sent to your connected group.");
  } catch (error) {
    console.error("Manual poll failed:", error);
    await ctx.reply("I couldn't post the poll. Check that I'm still in the group and have permission to send polls and photos.");
  }
});

bot.command("status", async ctx => {
  await ctx.reply(
    "⚽ SoccerFan Poll Bot\n" +
    "Schedule: every " + INTERVAL_HOURS + " hours\n" +
    "Connected group: " + (groupChatId || "Not connected — use /setgroup in your group") + "\n" +
    "Polls sent since this process started: " + pollCount
  );
});

bot.catch((error, ctx) => {
  console.error("Telegram handler error:", error);
  ctx.reply("Something went wrong while processing that command. Please try again.").catch(() => {});
});

app.get("/", (_req, res) => res.status(200).send("SoccerFan Poll Bot is running ⚽"));
app.get("/health", (_req, res) => res.status(200).json({ ok: true, bot: "SoccerFanPollBot", groupConnected: Boolean(groupChatId), intervalHours: INTERVAL_HOURS }));

app.listen(PORT, () => console.log("Health server listening on port " + PORT));

async function start() {
  await bot.launch();
  console.log("SoccerFan Poll Bot started.");
  console.log("Poll interval: every " + INTERVAL_HOURS + " hours.");
  if (groupChatId) {
    console.log("Connected group:", groupChatId);
    // First scheduled poll occurs one full interval after startup.
    setInterval(() => {
      sendPoll(groupChatId).catch(error => console.error("Scheduled poll failed:", error.message));
    }, INTERVAL_MS);
  } else {
    console.log("No group configured yet. Add the bot to a group and run /setgroup as a configured admin.");
  }
}

start().catch(error => {
  console.error("Bot failed to start:", error);
  process.exit(1);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
