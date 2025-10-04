'use client';

import { useState } from 'react';
import { Shield, ExternalLink, CheckCircle2 } from 'lucide-react';

interface TokenGateProps {
  onAccessGranted: () => void;
}

export function TokenGate({ onAccessGranted }: TokenGateProps) {
  const [isChecking, setIsChecking] = useState(false);

  const handleBuyPete = () => {
    // In production, open DEX with PETE contract pre-filled
    window.open('https://app.uniswap.org', '_blank');
  };

  const handleCheckBalance = async () => {
    setIsChecking(true);
    // Simulate balance check
    setTimeout(() => {
      setIsChecking(false);
      // In production, check actual balance via Base RPC
      onAccessGranted();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glass-card p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-bg" />
          </div>

          <h1 className="text-3xl font-bold text-fg mb-3">
            Access Requires PETE
          </h1>
          
          <p className="text-text-muted mb-8">
            Hold 20,000+ PETE tokens to unlock exclusive meme coin intelligence
          </p>

          {/* Current Balance Display */}
          <div className="glass-card p-6 mb-6">
            <p className="text-text-dim text-sm mb-2">Your Current Balance</p>
            <p className="text-4xl font-bold text-fg mb-2">0 PETE</p>
            <div className="w-full bg-bg rounded-full h-2 mb-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <p className="text-xs text-text-dim">
              Need 20,000 PETE to access
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleBuyPete}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Buy PETE Tokens
            </button>

            <button
              onClick={handleCheckBalance}
              disabled={isChecking}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              {isChecking ? (
                <>
                  <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                  Checking Balance...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  I Have PETE - Check Balance
                </>
              )}
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 p-4 bg-accent bg-opacity-10 rounded-lg border border-accent border-opacity-30">
            <h3 className="font-semibold text-accent mb-2">Why PETE?</h3>
            <ul className="text-sm text-text-muted text-left space-y-1">
              <li>• Exclusive access to verified calls</li>
              <li>• Real-time scam detection</li>
              <li>• Performance tracking & analytics</li>
              <li>• Priority notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
