'use client';

import { Copy, ExternalLink, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface CallCardProps {
  call: {
    id: string;
    caller: {
      name: string;
      handle: string;
      tier: 'whale' | 'alpha' | 'regular';
      avatar: string;
    };
    token: {
      name: string;
      ticker: string;
      contract: string;
    };
    timestamp: Date;
    platform: 'twitter' | 'telegram';
    scamFlags: string[];
    scamSeverity: 'low' | 'medium' | 'high' | 'critical' | null;
    metrics: {
      liquidity: number;
      marketCap: number;
      change24h: number;
    };
  };
}

export function CallCard({ call }: CallCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const formatTime = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const copyContract = () => {
    navigator.clipboard.writeText(call.token.contract);
    // In production, show toast notification
  };

  const tierColors = {
    whale: 'text-success',
    alpha: 'text-accent',
    regular: 'text-text-muted',
  };

  const tierBadges = {
    whale: '🐋 Whale',
    alpha: '⭐ Alpha',
    regular: '👤 Regular',
  };

  return (
    <div className={`glass-card p-5 hover:bg-surface-hover transition-all ${
      call.scamSeverity === 'high' || call.scamSeverity === 'critical' 
        ? 'border-danger border-2' 
        : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{call.caller.avatar}</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{call.caller.name}</h3>
              <span className={`text-xs ${tierColors[call.caller.tier]}`}>
                {tierBadges[call.caller.tier]}
              </span>
            </div>
            <p className="text-sm text-text-dim">{call.caller.handle}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-text-dim">{formatTime(call.timestamp)}</p>
          <span className="text-xs bg-surface px-2 py-1 rounded">
            {call.platform}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-bold">{call.token.ticker}</h2>
          <span className="text-text-muted">{call.token.name}</span>
          {call.scamSeverity && (
            <span className={`scam-badge-${call.scamSeverity}`}>
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              {call.scamSeverity.toUpperCase()} RISK
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-text-dim">
          <code className="bg-surface px-2 py-1 rounded text-xs">
            {call.token.contract.slice(0, 10)}...{call.token.contract.slice(-8)}
          </code>
          <button onClick={copyContract} className="hover:text-accent transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-text-dim mb-1">Liquidity</p>
          <p className="font-semibold">{formatNumber(call.metrics.liquidity)}</p>
        </div>
        <div>
          <p className="text-xs text-text-dim mb-1">Market Cap</p>
          <p className="font-semibold">{formatNumber(call.metrics.marketCap)}</p>
        </div>
        <div>
          <p className="text-xs text-text-dim mb-1">24h Change</p>
          <p className={`font-semibold flex items-center gap-1 ${
            call.metrics.change24h > 0 ? 'text-success' : 'text-danger'
          }`}>
            {call.metrics.change24h > 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {call.metrics.change24h > 0 ? '+' : ''}{call.metrics.change24h.toFixed(1)}%
          </p>
        </div>
      </div>

      {call.scamFlags.length > 0 && (
        <div className="mb-4 p-3 bg-danger bg-opacity-10 rounded-lg border border-danger border-opacity-30">
          <p className="text-sm font-medium text-danger mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Scam Indicators Detected
          </p>
          <div className="flex flex-wrap gap-2">
            {call.scamFlags.map((flag, idx) => (
              <span key={idx} className="text-xs bg-danger bg-opacity-20 text-danger px-2 py-1 rounded">
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button className="btn-primary flex-1 flex items-center justify-center gap-2">
          Trade Now
          <ExternalLink className="w-4 h-4" />
        </button>
        <button className="btn-secondary flex items-center justify-center gap-2">
          Details
        </button>
      </div>
    </div>
  );
}
