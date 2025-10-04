'use client';

import { useState } from 'react';
import { Search, Filter, TrendingUp, AlertTriangle, Copy, ExternalLink } from 'lucide-react';
import { CallCard } from './CallCard';

// Mock data for demonstration
const mockCalls = [
  {
    id: '1',
    caller: {
      name: 'CryptoWhale',
      handle: '@cryptowhale',
      tier: 'whale' as const,
      avatar: '🐋',
    },
    token: {
      name: 'MoonShot',
      ticker: 'MOON',
      contract: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    platform: 'twitter' as const,
    scamFlags: [],
    scamSeverity: null,
    metrics: {
      liquidity: 125000,
      marketCap: 450000,
      change24h: 156.7,
    },
  },
  {
    id: '2',
    caller: {
      name: 'AlphaHunter',
      handle: '@alphahunter',
      tier: 'alpha' as const,
      avatar: '🎯',
    },
    token: {
      name: 'SafeRug',
      ticker: 'SRUG',
      contract: '0x123d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    platform: 'telegram' as const,
    scamFlags: ['Low Liquidity', 'New Deployer'],
    scamSeverity: 'high' as const,
    metrics: {
      liquidity: 8500,
      marketCap: 25000,
      change24h: -45.2,
    },
  },
  {
    id: '3',
    caller: {
      name: 'DeFiGuru',
      handle: '@defiguru',
      tier: 'alpha' as const,
      avatar: '🧙',
    },
    token: {
      name: 'PumpIt',
      ticker: 'PUMP',
      contract: '0x456d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    platform: 'twitter' as const,
    scamFlags: [],
    scamSeverity: null,
    metrics: {
      liquidity: 85000,
      marketCap: 320000,
      change24h: 89.3,
    },
  },
];

export function CallFeed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="glass-card p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
            <input
              type="text"
              placeholder="Search tokens, callers, or contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface pl-10 pr-4 py-3 rounded-lg border border-transparent focus:border-accent outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="btn-secondary flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        
        {filterOpen && (
          <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="btn-secondary text-sm">
              All Tiers
            </button>
            <button className="btn-secondary text-sm">
              Last 24h
            </button>
            <button className="btn-secondary text-sm">
              High Risk Only
            </button>
            <button className="btn-secondary text-sm">
              Profitable
            </button>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-dim text-sm">Total Calls Today</span>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <p className="text-2xl font-bold">247</p>
          <p className="text-xs text-success">+18% from yesterday</p>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-dim text-sm">Avg ROI (24h)</span>
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <p className="text-2xl font-bold text-accent">+67.3%</p>
          <p className="text-xs text-text-dim">Across all calls</p>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-dim text-sm">Scams Detected</span>
            <AlertTriangle className="w-4 h-4 text-danger" />
          </div>
          <p className="text-2xl font-bold">34</p>
          <p className="text-xs text-danger">14% of total calls</p>
        </div>
      </div>

      {/* Call Cards */}
      <div className="space-y-4">
        {mockCalls.map((call) => (
          <CallCard key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
}
