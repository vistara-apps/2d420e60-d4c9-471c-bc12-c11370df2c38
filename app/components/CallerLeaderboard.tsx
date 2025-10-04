'use client';

import { Trophy, TrendingUp, AlertTriangle } from 'lucide-react';

const mockCallers = [
  {
    id: '1',
    name: 'CryptoWhale',
    handle: '@cryptowhale',
    tier: 'whale' as const,
    avatar: '🐋',
    stats: {
      totalCalls: 342,
      winRate: 78.5,
      avgROI: 145.3,
      rugRate: 8.2,
    },
  },
  {
    id: '2',
    name: 'AlphaHunter',
    handle: '@alphahunter',
    tier: 'alpha' as const,
    avatar: '🎯',
    stats: {
      totalCalls: 256,
      winRate: 72.1,
      avgROI: 98.7,
      rugRate: 12.5,
    },
  },
  {
    id: '3',
    name: 'DeFiGuru',
    handle: '@defiguru',
    tier: 'alpha' as const,
    avatar: '🧙',
    stats: {
      totalCalls: 189,
      winRate: 81.2,
      avgROI: 167.4,
      rugRate: 6.3,
    },
  },
];

export function CallerLeaderboard() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold">Top Performers</h2>
        </div>

        <div className="space-y-4">
          {mockCallers.map((caller, index) => (
            <div key={caller.id} className="glass-card p-5 hover:bg-surface-hover transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-accent w-12 text-center">
                  #{index + 1}
                </div>
                <div className="text-4xl">{caller.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{caller.name}</h3>
                  <p className="text-sm text-text-dim">{caller.handle}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    caller.tier === 'whale' ? 'text-success' : 'text-accent'
                  }`}>
                    {caller.tier === 'whale' ? '🐋 Whale' : '⭐ Alpha'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-xs text-text-dim mb-1">Total Calls</p>
                  <p className="text-xl font-bold">{caller.stats.totalCalls}</p>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-xs text-text-dim mb-1">Win Rate</p>
                  <p className="text-xl font-bold text-success">{caller.stats.winRate}%</p>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-xs text-text-dim mb-1">Avg ROI</p>
                  <p className="text-xl font-bold text-accent">+{caller.stats.avgROI}%</p>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-xs text-text-dim mb-1">Rug Rate</p>
                  <p className="text-xl font-bold text-danger">{caller.stats.rugRate}%</p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Add to Watchlist
                </button>
                <button className="btn-secondary">View History</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <div className="flex-1">
              <p className="font-medium">Average rug rate across all callers</p>
              <p className="text-sm text-text-dim">9.7% - Stay vigilant</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
            <TrendingUp className="w-5 h-5 text-success" />
            <div className="flex-1">
              <p className="font-medium">Best performing tier</p>
              <p className="text-sm text-text-dim">Whale callers: +152% avg ROI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
