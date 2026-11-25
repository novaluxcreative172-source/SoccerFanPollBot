# SoccerFan Poll Bot ⚽

A Telegram football community bot that posts interactive football polls every four hours. It mixes text debates with image-led football prompts.

## Features

- Automatic poll scheduling (4 hours by default).
- A mix of text polls and image + poll posts.
- Football topics: players, clubs, tactics, TIFOs, matchday atmosphere, transfers, refereeing and fan debates.
- Anonymous Telegram voting.
- Admin-only `/poll` command for an instant poll.
- `/setgroup` to connect the group.
- `/status` and `/help` commands.
- Lightweight health endpoint for Render.

## Deploy on Render

1. Create a Telegram bot with [@BotFather](https://t.me/BotFather) and copy its token.
2. In Render, create a **Web Service** from this repository.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:

| Key | Value |
| --- | --- |
| `BOT_TOKEN` | Your private BotFather token |
| `ADMIN_IDS` | Your Telegram numeric user ID(s), comma-separated |
| `GROUP_CHAT_ID` | Optional; can be left blank and set using `/setgroup` |
| `POLL_INTERVAL_HOURS` | `4` |

6. Deploy the service.
7. Add the bot to your Telegram group and grant permission to send messages, photos and polls.
8. From an account listed in `ADMIN_IDS`, send `/setgroup` in the group.
9. Send `/poll` to test an immediate poll.

### Important uptime note

The scheduler runs inside the Node process. A sleeping or suspended hosting instance cannot send scheduled polls while it is asleep. Use an always-on Render instance (or another always-on worker) to keep the four-hour schedule reliable. The included Render blueprint uses the Starter plan for this reason.

## Environment variables

- `BOT_TOKEN` — required.
- `ADMIN_IDS` — required for protected setup and manual-poll commands. Use numeric Telegram user IDs, e.g. `123456789,987654321`.
- `GROUP_CHAT_ID` — optional. If supplied, the bot starts scheduling for this group immediately.
- `POLL_INTERVAL_HOURS` — optional; defaults to `4`.
- `PORT` — supplied by Render; defaults to `10000`.

## Image polls

The bot sends a football-themed image first, then a native Telegram poll in the next message. The image URLs are configurable in `polls.js`. If an image host is unavailable, the bot still attempts to send the poll.

## Local run

```bash
npm install
cp .env.example .env
# Add BOT_TOKEN and ADMIN_IDS to .env
npm start
```

Never commit your `.env` file or share your bot token publicly.
