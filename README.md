# PETE Tracker - Meme Coin Intelligence Platform

A token-gated Base MiniApp that aggregates meme coin calls from crypto influencers, providing real-time alerts, performance tracking, and scam detection.

## Features

- **Token-Gated Access**: Requires 20,000+ PETE tokens
- **Real-Time Call Feed**: Live updates from Twitter and Telegram influencers
- **Scam Detection**: AI-powered pattern recognition for rug pulls
- **Caller Leaderboard**: Performance tracking and reputation scoring
- **Instant Alerts**: Push notifications for watchlist callers
- **One-Tap Trading**: Quick contract copying and DEX integration

## Tech Stack

- Next.js 15 with App Router
- React 19
- OnchainKit for Base integration
- Tailwind CSS with custom finance theme
- TypeScript

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` from `.env.local.example`:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_PETE_CONTRACT`: PETE token contract address
- `NEXT_PUBLIC_MIN_PETE_BALANCE`: Minimum PETE balance required (default: 20000)

## Design System

The app uses a professional finance theme:
- Dark navy background (#0a1628)
- Gold accents (#ffd700)
- Clean, modern borders
- Responsive mobile-first design

## License

MIT
