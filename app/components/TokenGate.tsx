'use client';

import { Shield, ArrowRight } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';

export function TokenGate() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-accent" />
        </div>
        
        <h1 className="text-3xl font-bold mb-3 text-gradient">
          Access Requires PETE
        </h1>
        
        <p className="text-text-muted mb-6">
          Hold 20,000+ PETE tokens to unlock exclusive meme coin intelligence
        </p>
        
        <div className="glass-card p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-dim text-sm">Required Balance</span>
            <span className="text-accent font-bold">20,000 PETE</span>
          </div>
          <div className="w-full bg-surface-hover rounded-full h-2">
            <div className="bg-accent h-2 rounded-full w-0"></div>
          </div>
        </div>
        
        <Wallet>
          <ConnectWallet className="w-full">
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              Connect Wallet
              <ArrowRight className="w-4 h-4" />
            </button>
          </ConnectWallet>
        </Wallet>
        
        <button className="btn-secondary w-full mt-3 flex items-center justify-center gap-2">
          Buy PETE Tokens
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <p className="text-xs text-text-dim mt-6">
          PETE tokens grant permanent access to the platform
        </p>
      </div>
    </div>
  );
}
