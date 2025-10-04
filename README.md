# PETE Tracker - Meme Coin Intelligence Platform

A token-gated Base MiniApp that aggregates meme coin calls from crypto influencers, providing real-time alerts, performance tracking, and scam detection.

## Features

- **Token-Gated Access**: Requires 20,000+ PETE tokens
- **Real-Time Call Feed**: Live updates from Twitter and Telegram influencers
- **Scam Detection**: AI-powered pattern recognition for rug pulls
- **Caller Leaderboard**: Performance tracking and reputation scores
- **Instant Alerts**: Push notifications for whale calls
- **One-Tap Trading**: Quick contract copy and DEX integration

## Tech Stack

- Next.js 15 (App Router)
- React 19
- OnchainKit (Base integration)
- Tailwind CSS
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

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_PETE_CONTRACT`: PETE token contract address
- `NEXT_PUBLIC_BASE_RPC`: Base RPC endpoint
- `NEXT_PUBLIC_MIN_PETE_BALANCE`: Minimum PETE holding (default: 20000)

## Design System

### Colors
- Background: Dark Navy (#0a1628)
- Accent: Gold (#ffd700)
- Success: Green (#10b981)
- Danger: Red (#ef4444)
- Warning: Orange (#f59e0b)

### Components
- Glass cards with subtle borders
- Gold gradient buttons
- Tier-based caller badges
- Severity-based scam alerts

## License

MIT
