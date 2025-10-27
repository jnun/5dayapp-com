'use client';

import { useState } from 'react';
import { Bell, TrendingUp, CheckCircle, Clock, DollarSign, Users, Calendar, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import './notifications.css';

interface Notification {
  id: string;
  type: 'round_closing' | 'milestone' | 'update' | 'success';
  title: string;
  message: string;
  company: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
  metadata?: {
    amount?: number;
    investors?: number;
    daysLeft?: number;
    progress?: number;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'round_closing',
      title: 'Investment Round Closing Soon',
      message: 'Faith Forward Coffee\'s investment round closes in 3 days. Don\'t miss your chance to invest!',
      company: 'Faith Forward Coffee',
      timestamp: '2 hours ago',
      read: false,
      actionLabel: 'Invest Now',
      actionUrl: '/invest/1',
      metadata: {
        daysLeft: 3,
        progress: 92,
        amount: 230000,
      },
    },
    {
      id: '2',
      type: 'success',
      title: 'Investment Round Closed Successfully',
      message: 'Kingdom Kids Learning has successfully closed their funding round. Your investment is now being processed.',
      company: 'Kingdom Kids Learning',
      timestamp: '1 day ago',
      read: false,
      actionLabel: 'View Certificate',
      actionUrl: '/certificate/xyz789',
      metadata: {
        amount: 150000,
        investors: 52,
      },
    },
    {
      id: '3',
      type: 'milestone',
      title: '75% Funding Milestone Reached',
      message: 'Faithful Finance App has reached 75% of their funding goal with 12 days remaining!',
      company: 'Faithful Finance App',
      timestamp: '2 days ago',
      read: true,
      actionLabel: 'View Campaign',
      actionUrl: '/invest/4',
      metadata: {
        progress: 75,
        daysLeft: 12,
      },
    },
    {
      id: '4',
      type: 'update',
      title: 'New Update from Founder',
      message: 'Hope Restoration Services has posted a new update about their progress and upcoming milestones.',
      company: 'Hope Restoration Services',
      timestamp: '3 days ago',
      read: true,
      actionLabel: 'Read Update',
      actionUrl: '/invest/3/updates',
    },
    {
      id: '5',
      type: 'round_closing',
      title: 'Last Chance to Invest',
      message: 'Faithful Finance App closes in 24 hours. This is your final opportunity to participate in this round.',
      company: 'Faithful Finance App',
      timestamp: '5 days ago',
      read: true,
      actionLabel: 'View Details',
      actionUrl: '/invest/4',
      metadata: {
        daysLeft: 1,
        progress: 89,
      },
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        {/* Header */}
        <div className="notifications-header">
          <div className="header-title">
            <Bell size={32} strokeWidth={1.5} />
            <div>
              <h1>Notifications</h1>
              {unreadCount > 0 && (
                <p className="unread-count">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
              )}
            </div>
          </div>

          <div className="header-actions">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
                onClick={() => setFilter('unread')}
              >
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </button>
            </div>

            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={handleMarkAllAsRead}>
                <CheckCircle size={18} />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <Bell size={64} strokeWidth={1.5} />
              <h3>No {filter === 'unread' ? 'unread' : ''} notifications</h3>
              <p>You&apos;re all caught up! Check back later for updates on your investments.</p>
              <Link href="/invest" className="btn btn-primary">
                Browse Investment Opportunities
              </Link>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismiss}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationCard({
  notification,
  onMarkAsRead,
  onDismiss,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const getIcon = () => {
    switch (notification.type) {
      case 'round_closing':
        return <Clock size={24} strokeWidth={1.5} />;
      case 'milestone':
        return <TrendingUp size={24} strokeWidth={1.5} />;
      case 'success':
        return <CheckCircle size={24} strokeWidth={1.5} />;
      case 'update':
        return <Bell size={24} strokeWidth={1.5} />;
      default:
        return <Bell size={24} strokeWidth={1.5} />;
    }
  };

  const getTypeClass = () => {
    switch (notification.type) {
      case 'round_closing':
        return 'type-urgent';
      case 'milestone':
        return 'type-milestone';
      case 'success':
        return 'type-success';
      case 'update':
        return 'type-update';
      default:
        return '';
    }
  };

  return (
    <div className={`notification-card ${!notification.read ? 'unread' : ''} ${getTypeClass()}`}>
      {!notification.read && <div className="unread-indicator"></div>}

      <button className="dismiss-button" onClick={() => onDismiss(notification.id)} title="Dismiss">
        <X size={18} />
      </button>

      <div className="notification-icon">{getIcon()}</div>

      <div className="notification-content">
        <div className="notification-header">
          <h3>{notification.title}</h3>
          <span className="notification-time">{notification.timestamp}</span>
        </div>

        <p className="notification-company">{notification.company}</p>
        <p className="notification-message">{notification.message}</p>

        {notification.metadata && (
          <div className="notification-metadata">
            {notification.metadata.daysLeft !== undefined && (
              <div className="meta-item">
                <Calendar size={16} />
                <span>{notification.metadata.daysLeft} days left</span>
              </div>
            )}
            {notification.metadata.progress !== undefined && (
              <div className="meta-item">
                <TrendingUp size={16} />
                <span>{notification.metadata.progress}% funded</span>
              </div>
            )}
            {notification.metadata.amount !== undefined && (
              <div className="meta-item">
                <DollarSign size={16} />
                <span>${(notification.metadata.amount / 1000).toFixed(0)}K raised</span>
              </div>
            )}
            {notification.metadata.investors !== undefined && (
              <div className="meta-item">
                <Users size={16} />
                <span>{notification.metadata.investors} investors</span>
              </div>
            )}
          </div>
        )}

        <div className="notification-actions">
          {notification.actionLabel && notification.actionUrl && (
            <Link href={notification.actionUrl} className="action-button primary">
              {notification.actionLabel}
              <ArrowRight size={16} />
            </Link>
          )}
          {!notification.read && (
            <button className="action-button secondary" onClick={() => onMarkAsRead(notification.id)}>
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
