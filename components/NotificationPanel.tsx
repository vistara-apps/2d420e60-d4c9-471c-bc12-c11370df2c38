'use client';

import { Bell, TrendingUp, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'call' | 'alert' | 'performance';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export function NotificationPanel() {
  // Mock data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'call',
      title: 'New Whale Call',
      message: 'CryptoWhale just called $PEPEMAX - Low risk detected',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
    },
    {
      id: '2',
      type: 'alert',
      title: 'Critical Scam Detected',
      message: '$SRUG flagged as honeypot - Avoid this token',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false,
      severity: 'critical',
    },
    {
      id: '3',
      type: 'performance',
      title: 'Caller Tier Updated',
      message: 'AlphaHunter promoted to Whale tier',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true,
    },
  ];

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getIcon = (type: string, severity?: string) => {
    if (severity === 'critical') {
      return <AlertTriangle className="w-5 h-5 text-danger" />;
    }
    switch (type) {
      case 'call':
        return <TrendingUp className="w-5 h-5 text-success" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'performance':
        return <CheckCircle2 className="w-5 h-5 text-accent" />;
      default:
        return <Bell className="w-5 h-5 text-text-muted" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-fg">Notifications</h2>
          </div>
          <button className="text-sm text-accent hover:text-primary-hover transition-colors duration-200">
            Mark all as read
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`glass-card p-4 hover:bg-surface-hover transition-all duration-200 ${
                !notification.read ? 'border-l-4 border-accent' : ''
              } ${
                notification.severity === 'critical' ? 'border-2 border-danger' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type, notification.severity)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-fg">{notification.title}</h3>
                    <button className="flex-shrink-0 p-1 hover:bg-surface rounded transition-colors duration-200">
                      <X className="w-4 h-4 text-text-muted" />
                    </button>
                  </div>
                  <p className="text-sm text-text-muted mb-2">{notification.message}</p>
                  <p className="text-xs text-text-dim">{formatTimeAgo(notification.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-fg mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-fg">Whale Calls</p>
              <p className="text-sm text-text-dim">Get notified for all whale tier calls</p>
            </div>
            <button className="w-12 h-6 bg-accent rounded-full relative transition-colors duration-200">
              <div className="absolute right-1 top-1 w-4 h-4 bg-bg rounded-full"></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-fg">Scam Alerts</p>
              <p className="text-sm text-text-dim">Critical scam detection notifications</p>
            </div>
            <button className="w-12 h-6 bg-accent rounded-full relative transition-colors duration-200">
              <div className="absolute right-1 top-1 w-4 h-4 bg-bg rounded-full"></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-fg">Performance Updates</p>
              <p className="text-sm text-text-dim">Caller tier changes and milestones</p>
            </div>
            <button className="w-12 h-6 bg-surface rounded-full relative transition-colors duration-200">
              <div className="absolute left-1 top-1 w-4 h-4 bg-text-dim rounded-full"></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-fg">Weekly Digest</p>
              <p className="text-sm text-text-dim">Top performing calls summary</p>
            </div>
            <button className="w-12 h-6 bg-accent rounded-full relative transition-colors duration-200">
              <div className="absolute right-1 top-1 w-4 h-4 bg-bg rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
