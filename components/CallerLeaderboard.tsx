'use client';

import { Trophy, TrendingUp, AlertTriangle, Star } from 'lucide-react';

interface Caller {
  id: string;
  name: string;
  tier: 'whale' | 'alpha' | 'regular';
  totalCalls: number;
  winRate: number;
  avgROI: number;
  rugRate: number;
  reputationScore: number;
}

export function CallerLeaderboard() {
  // Mock data
  const callers: Caller[] = [
    {
      id: '1',
      name: 'CryptoWhale',
      tier: 'whale',
      totalCalls: 156,
      winRate: 78.5,
      avgROI: 245.3,
      rugRate: 8.2,
      reputationScore: 95,
    },
    {
      id: '2',
      name: 'AlphaHunter',
      tier: 'alpha',
      totalCalls: 203,
      winRate: 72.1,
      avgROI: 189.7,
      rugRate: 12.5,
      reputationScore: 88,
    },
    {
      id: '3',
      name: 'DegenKing',
      tier: 'whale',
      totalCalls: 98,
      winRate: 81.2,
      avgROI: 312.8,
      rugRate: 5.1,
      reputationScore: 97,
    },
    {
      id: '4',
      name: 'MoonSeeker',
      tier: 'alpha',
      totalCalls: 145,
      winRate: 68.9,
      avgROI: 156.4,
      rugRate: 15.8,
      reputationScore: 82,
    },
  ];

  const getTierBadgeClass = (tier: string) => {
    switch (tier) {
      case 'whale': return 'caller-badge-whale';
      case 'alpha': return 'caller-badge-alpha';
      default: return 'caller-badge-regular';
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold text-fg">Caller Performance Leaderboard</h2>
        </div>

        <div className="space-y-3">
          {callers.map((caller, index) => (
            <div
              key={caller.id}
              className="glass-card p-4 hover:bg-surface-hover transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  {index === 0 && (
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-bg font-bold text-lg">1</span>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-bg font-bold text-lg">2</span>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-bg font-bold text-lg">3</span>
                    </div>
                  )}
                  {index > 2 && (
                    <span className="text-2xl font-bold text-text-dim">{index + 1}</span>
                  )}
                </div>

                {/* Caller Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-fg text-lg">{caller.name}</h3>
                    <span className={getTierBadgeClass(caller.tier)}>
                      {caller.tier.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-text-dim mb-1">Total Calls</p>
                      <p className="font-semibold text-fg">{caller.totalCalls}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-text-dim mb-1">Win Rate</p>
                      <p className="font-semibold text-success">{caller.winRate}%</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-text-dim mb-1">Avg ROI</p>
                      <p className="font-semibold text-accent">+{caller.avgROI}%</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-text-dim mb-1">Rug Rate</p>
                      <p className="font-semibold text-danger">{caller.rugRate}%</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-text-dim mb-1">Reputation</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <p className="font-semibold text-fg">{caller.reputationScore}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0">
                  <button className="btn-secondary px-4 py-2 text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-fg">Best Performer</h3>
          </div>
          <p className="text-2xl font-bold text-accent mb-1">DegenKing</p>
          <p className="text-sm text-text-muted">+312.8% avg ROI</p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-fg">Most Reliable</h3>
          </div>
          <p className="text-2xl font-bold text-success mb-1">DegenKing</p>
          <p className="text-sm text-text-muted">81.2% win rate</p>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-danger" />
            <h3 className="font-semibold text-fg">Safest Caller</h3>
          </div>
          <p className="text-2xl font-bold text-success mb-1">DegenKing</p>
          <p className="text-sm text-text-muted">5.1% rug rate</p>
        </div>
      </div>
    </div>
  );
}
