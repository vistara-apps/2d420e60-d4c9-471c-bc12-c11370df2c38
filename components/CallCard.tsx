'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Copy, 
  ExternalLink,
  CheckCircle2,
  Twitter,
  MessageSquare,
  Clock,
  DollarSign,
  Droplets
} from 'lucide-react';

interface Call {
  id: string;
  callerId: string;
  callerName: string;
  callerTier: 'whale' | 'alpha' | 'regular';
  tokenName: string;
  tokenTicker: string;
  contractAddress: string;
  platform: 'twitter' | 'telegram';
  timestamp: Date;
  scamFlags: string[];
  scamSeverity: 'low' | 'medium' | 'high' | 'critical';
  performance24h: number;
  initialMarketCap: number;
  initialLiquidity: number;
}

interface CallCardProps {
  call: Call;
}

export function CallCard({ call }: CallCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(call.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const getTierBadgeClass = () => {
    switch (call.callerTier) {
      case 'whale': return 'caller-badge-whale';
      case 'alpha': return 'caller-badge-alpha';
      default: return 'caller-badge-regular';
    }
  };

  const getScamBadgeClass = () => {
    switch (call.scamSeverity) {
      case 'low': return 'scam-badge-low';
      case 'medium': return 'scam-badge-medium';
      case 'high': return 'scam-badge-high';
      case 'critical': return 'scam-badge-critical';
    }
  };

  return (
    <div className={`glass-card p-6 hover:bg-surface-hover transition-all duration-200 ${
      call.scamSeverity === 'critical' ? 'border-2 border-danger' : ''
    }`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Caller Info */}
        <div className="flex items-start gap-4 md:w-64">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-bg font-bold text-lg">
              {call.callerName.charAt(0)}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-fg truncate">{call.callerName}</h3>
              {call.platform === 'twitter' ? (
                <Twitter className="w-4 h-4 text-blue-400 flex-shrink-0" />
              ) : (
                <MessageSquare className="w-4 h-4 text-blue-400 flex-shrink-0" />
              )}
            </div>
            <span className={getTierBadgeClass()}>
              {call.callerTier.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Middle Section - Token Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-fg mb-1">
                ${call.tokenTicker}
              </h2>
              <p className="text-text-muted text-sm">{call.tokenName}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {call.performance24h > 0 ? (
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold text-lg">+{call.performance24h.toFixed(1)}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-danger">
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-bold text-lg">{call.performance24h.toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="flex items-center gap-1 text-text-dim text-xs mb-1">
                <DollarSign className="w-3 h-3" />
                <span>Market Cap</span>
              </div>
              <p className="font-semibold text-fg">{formatNumber(call.initialMarketCap)}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-1 text-text-dim text-xs mb-1">
                <Droplets className="w-3 h-3" />
                <span>Liquidity</span>
              </div>
              <p className="font-semibold text-fg">{formatNumber(call.initialLiquidity)}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-1 text-text-dim text-xs mb-1">
                <Clock className="w-3 h-3" />
                <span>Posted</span>
              </div>
              <p className="font-semibold text-fg">{formatTimeAgo(call.timestamp)}</p>
            </div>
          </div>

          {/* Scam Flags */}
          {call.scamFlags.length > 0 && (
            <div className="flex items-start gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={getScamBadgeClass()}>
                    {call.scamSeverity.toUpperCase()} RISK
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {call.scamFlags.map((flag, index) => (
                    <span key={index} className="text-xs text-danger bg-danger bg-opacity-10 px-2 py-1 rounded">
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contract Address */}
          <div className="flex items-center gap-2 p-3 bg-bg rounded-lg">
            <code className="flex-1 text-xs text-text-muted font-mono truncate">
              {call.contractAddress}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-surface-hover rounded transition-colors duration-200"
              title="Copy contract address"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-success" />
              ) : (
                <Copy className="w-4 h-4 text-text-muted" />
              )}
            </button>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col gap-2 md:w-48">
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Trade Now
          </button>
          
          <button className="btn-secondary w-full">
            View Details
          </button>
          
          <button className="btn-secondary w-full">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
