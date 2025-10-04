'use client';

import { TrendingUp, Users, Bell, Settings2 } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: React.ReactNode;
  activeTab: 'feed' | 'leaderboard';
  onTabChange: (tab: 'feed' | 'leaderboard') => void;
}

export function AppShell({ children, activeTab, onTabChange }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-bg font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">PETE Tracker</h1>
                <p className="text-xs text-text-dim">Meme Coin Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                <Settings2 className="w-5 h-5" />
              </button>
              <Wallet>
                <ConnectWallet>
                  <Avatar className="w-8 h-8" />
                  <Name className="text-sm" />
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => onTabChange('feed')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === 'feed'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-muted hover:text-fg'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Live Feed
            </button>
            <button
              onClick={() => onTabChange('leaderboard')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === 'leaderboard'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-muted hover:text-fg'
              }`}
            >
              <Users className="w-4 h-4" />
              Leaderboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
