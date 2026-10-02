import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavChild {
  label: string;
  route: string;
}

export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  badge?: number;
  children?: NavChild[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly openItems = signal<Set<string>>(new Set());

  readonly groups: NavGroup[] = [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', icon: 'home', route: '/dashboard' },
      ],
    },

    {
      label: 'Users & Funds',
      items: [
        { label: 'Users', icon: 'users', route: '/Users' },
        { label: 'Wallets', icon: 'wallet', route: '/wallets' },
        { label: 'Transactions', icon: 'swap', route: '/Transactions' },
        { label: 'Savings', icon: 'savings', route: '/savings' },
      ],
    },

    {
      label: 'Health & Insurance',
      items: [
        { label: 'Financial Health', icon: 'heart', route: '/health' },
        { label: 'Insurance', icon: 'shield', route: '/insurance' },
        { label: 'Clinics', icon: 'clinic', route: '/clinics' },
      ],
    },

    {
      label: 'Security & Admin',
      items: [
        { label: 'Fraud & Security', icon: 'alert', route: '/fraud' },
        { label: 'Notifications', icon: 'bell', route: '/notifications' },
        { label: 'Reports', icon: 'chart', route: '/reports' },
        { label: 'Settings', icon: 'gear', route: '/settings' },
        { label: 'Profile', icon: 'user', route: '/profile' },
        { label: 'Logout', icon: 'user', route: '/logout' },
      ],
    },
  ];

  toggle(label: string): void {
    const next = new Set(this.openItems());

    if (next.has(label)) {
      next.delete(label);
    } else {
      next.add(label);
    }

    this.openItems.set(next);
  }

  isOpen(label: string): boolean {
    return this.openItems().has(label);
  }
}