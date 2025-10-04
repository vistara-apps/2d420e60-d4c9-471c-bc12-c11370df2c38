'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { TokenGate } from './components/TokenGate';
import { CallFeed } from './components/CallFeed';
import { CallerLeaderboard } from './components/CallerLeaderboard';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard'>('feed');

  useEffect(() => {
    const checkPeteBalance = async () => {
      if (!address) {
        setIsChecking(false);
        return;
      }

      // Simulate PETE balance check
      // In production, this would call Base RPC to check actual balance
      setTimeout(() => {
        // For demo, grant access if wallet is connected
        setHasAccess(isConnected);
        setIsChecking(false);
      }, 1500);
    };

    checkPeteBalance();
  }, [address, isConnected]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Checking PETE balance...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return <TokenGate />;
  }

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'feed' ? <CallFeed /> : <CallerLeaderboard />}
    </AppShell>
  );
}
