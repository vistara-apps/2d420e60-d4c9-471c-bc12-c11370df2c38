'use client';

import { useState, useEffect } from 'react';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { 
  TrendingUp, 
  AlertTriangle, 
  Trophy, 
  Bell, 
  Search,
  Filter,
  Star,
  ExternalLink,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { CallCard } from './CallCard';
import { CallerLeaderboard } from './CallerLeaderboard';
import { TokenGate } from './TokenGate';
import { NotificationPanel } from './NotificationPanel';

export function Dashboard() {
  const [hasAccess, setHasAccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard' | 'alerts'>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<'all' | 'whale' | 'alpha'>('all');

  // Mock data - in production, fetch from API
  const mockCalls = [
    {
      id: '1',
      callerId: 'caller1',
      callerName: 'CryptoWhale',
      callerTier: 'whale' as const,
      tokenName: 'PepeMax',
      tokenTicker: 'PEPEMAX',
      contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      platform: 'twitter' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      scamFlags: ['Low Liquidity'],
      scamSeverity: 'medium' as const,
      performance24h: 156.7,
      initialMarketCap: 250000,
      initialLiquidity: 8500,
    },
    {
      id: '2',
      callerId: 'caller2',
      callerName: 'AlphaHunter',
      callerTier: 'alpha' as const,
      tokenName: 'MoonDoge',
      tokenTicker: 'MDOGE',
      contractAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      platform: 'telegram' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      scamFlags: [],
      scamSeverity: 'low' as const,
      performance24h: 89.3,
      initialMarketCap: 500000,
      initialLiquidity: 25000,
    },
    {
      id: '3',
      callerId: 'caller3',
      callerName: 'DegenKing',
      callerTier: 'whale' as const,
      tokenName: 'SafeRug',
      tokenTicker: 'SRUG',
      contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      platform: 'twitter' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      scamFlags: ['Honeypot Detected', 'New Wallet', 'Known Scammer Link'],
      scamSeverity: 'critical' as const,
      performance24h: -95.2,
      initialMarketCap: 100000,
      initialLiquidity: 3000,
    },
  ];

  useEffect(() => {
    // Simulate token verification
    const timer = setTimeout(() => {
      setIsVerifying(false);
      // In production, check actual PETE balance via Base RPC
      setHasAccess(true); // Set to true for demo
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Verifying PETE balance...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return <TokenGate onAccessGranted={() => setHasAccess(true)} />;
  }

  const filteredCalls = mockCalls.filter(call => {
    const matchesSearch = searchQuery === '' || 
      call.tokenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.tokenTicker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.callerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTier = filterTier === 'all' || call.callerTier === filterTier;
    
    return matchesSearch && matchesTier;
  });

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-bg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">PETE Tracker</h1>
                <p className="text-xs text-text-dim">Meme Coin Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-surface-hover rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5 text-text-muted" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              </button>
              
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-surface-hover transition-colors duration-200 rounded-lg">
                    <Avatar className="w-6 h-6" />
                    <Name className="text-sm font-medium" />
                  </div>
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-dim text-sm">Active Calls</span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-fg">247</p>
            <p className="text-xs text-success">+12% today</p>
          </div>
          
          <div className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-dim text-sm">Avg 24h ROI</span>
              <Trophy className="w-4 h-4 text-accent" />
            </div>
            <p className="text-2xl font-bold text-accent">+156%</p>
            <p className="text-xs text-text-muted">Top performers</p>
          </div>
          
          <div className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-dim text-sm">Scams Blocked</span>
              <AlertTriangle className="w-4 h-4 text-danger" />
            </div>
            <p className="text-2xl font-bold text-fg">89</p>
            <p className="text-xs text-danger">This week</p>
          </div>
          
          <div className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-dim text-sm">Your PETE</span>
              <Star className="w-4 h-4 text-accent" />
            </div>
            <p className="text-2xl font-bold text-fg">25,000</p>
            <p className="text-xs text-success">Access granted</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 glass-card p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'feed'
                ? 'bg-accent text-bg shadow-glow'
                : 'text-text-muted hover:text-fg'
            }`}
          >
            Live Feed
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'leaderboard'
                ? 'bg-accent text-bg shadow-glow'
                : 'text-text-muted hover:text-fg'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'alerts'
                ? 'bg-accent text-bg shadow-glow'
                : 'text-text-muted hover:text-fg'
            }`}
          >
            Alerts
          </button>
        </div>

        {/* Search and Filters */}
        {activeTab === 'feed' && (
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
              <input
                type="text"
                placeholder="Search tokens, callers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-fg placeholder-text-dim"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilterTier('all')}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filterTier === 'all'
                    ? 'bg-accent text-bg'
                    : 'glass-card text-text-muted hover:bg-surface-hover'
                }`}
              >
                All Tiers
              </button>
              <button
                onClick={() => setFilterTier('whale')}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filterTier === 'whale'
                    ? 'bg-success text-white'
                    : 'glass-card text-text-muted hover:bg-surface-hover'
                }`}
              >
                Whales
              </button>
              <button
                onClick={() => setFilterTier('alpha')}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filterTier === 'alpha'
                    ? 'bg-accent text-bg'
                    : 'glass-card text-text-muted hover:bg-surface-hover'
                }`}
              >
                Alpha
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'feed' && (
          <div className="space-y-4">
            {filteredCalls.map((call) => (
              <CallCard key={call.id} call={call} />
            ))}
            
            {filteredCalls.length === 0 && (
              <div className="glass-card p-12 text-center">
                <Search className="w-12 h-12 text-text-dim mx-auto mb-4" />
                <p className="text-text-muted">No calls match your filters</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'leaderboard' && <CallerLeaderboard />}
        {activeTab === 'alerts' && <NotificationPanel />}
      </main>
    </div>
  );
}
