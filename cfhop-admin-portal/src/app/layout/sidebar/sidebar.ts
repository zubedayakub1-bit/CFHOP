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
  /** Labels of nav items whose dropdown is currently expanded. */
  private readonly openItems = signal<Set<string>>(new Set());

  readonly groups: NavGroup[] = [
    {
      label: 'Overview',
      items: [{ label: 'Dashboard', icon: 'home', route: '/dashboard' }],
    },
    {
      label: 'Users & Funds',
      items: [
        {
          label: 'Users',
          icon: 'users',
          route:'/Users'
        },
        { label: 'Wallets', icon: 'wallet', route: '/wallets' },
        {
          label: 'Transactions',
          icon: 'swap',
          
        },
        { label: 'Chamas & SACCOs', icon: 'group', route: '/chamas' },
      ],
    },
    {
      label: 'Community Products',
      items: [
        { label: 'Health', icon: 'heart', route: '/health' },
        { label: 'Insurance', icon: 'shield', route: '/insurance' },
        { label: 'Trust Score', icon: 'star', route: '/trust-score' },
        { label: 'Opportunities', icon: 'briefcase', route: '/opportunities' },
      ],
    },
    {
      label: 'Risk & Admin',
      items: [
        { label: 'Fraud', icon: 'alert', route: '/fraud', badge: 23 },
        { label: 'Reports', icon: 'chart', route: '/reports' },
        { label: 'Settings', icon: 'gear', route: '/settings' },
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