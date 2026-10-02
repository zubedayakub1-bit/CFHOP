import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface NotificationItem {
  title: string;
  message: string;
  time: string;
  type: 'high' | 'info' | 'success' | 'report' | 'admin';
  unread: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notifications {

  unreadCount = 1;

  notifications: NotificationItem[] = [
    {
      title: 'High-risk transaction detected',
      message: 'TXN-88415 for KES 150,000 requires immediate review.',
      time: '12 minutes ago',
      type: 'high',
      unread: true
    },
    {
      title: 'Clinic verification pending',
      message: 'Kisumu Wellness Hub submitted updated compliance documents.',
      time: '1 hour ago',
      type: 'info',
      unread: false
    },
    {
      title: 'Settlement completed',
      message: 'Daily M-Pesa settlement of KES 8.2M reconciled successfully.',
      time: '3 hours ago',
      type: 'success',
      unread: false
    },
    {
      title: 'Monthly report is ready',
      message: 'The August platform performance report is available to download.',
      time: 'Yesterday',
      type: 'report',
      unread: false
    },
    {
      title: 'New administrator added',
      message: 'Wanjiru M. was added with the HEALTH_ADMIN role.',
      time: '2 days ago',
      type: 'admin',
      unread: false
    }
  ];

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.unread = false;
    });

    this.unreadCount = 0;
  }

  markAsRead(notification: NotificationItem): void {
    if (notification.unread) {
      notification.unread = false;
      this.unreadCount--;
    }
  }
}