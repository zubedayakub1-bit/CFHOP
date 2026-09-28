import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type UserStatus = 'active' | 'suspended' | 'flagged' | 'inactive';
export type KycStatus = 'verified' | 'unverified' | 'failed' | 'pending';
export type StatusFilter = 'all' | UserStatus;
export type SortKey = 'trustScore' | 'balance' | 'joined';
export type ModalType = 'view' | 'edit' | 'suspend' | 'reinstate' | null;

export interface User {
  id: number;
  name: string;
  phone: string;
  status: UserStatus;
  trustScore: number;
  balance: number;
  kyc: KycStatus;
  joined: string; // yyyy-mm-dd
  avatarColor: string;
  suspendReason?: string;
}

@Component({
  selector: 'app-members-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './members.html',
  styleUrls: ['./members.scss'],
})
export class Members {
  readonly filters: StatusFilter[] = ['all', 'active', 'suspended', 'flagged', 'inactive'];
  readonly statuses: UserStatus[] = ['active', 'inactive', 'flagged', 'suspended'];
  readonly kycOptions: KycStatus[] = ['verified', 'unverified', 'pending', 'failed'];
  readonly suspendReasons = [
    'Suspicious activity',
    'Failed KYC verification',
    'Chargeback / fraud report',
    'Violation of terms',
    'Requested by user',
    'Other',
  ];

  users: User[] = [
    { id: 1, name: 'Halima Abdi', phone: '+252617234567', status: 'active', trustScore: 72, balance: 36800, kyc: 'verified', joined: '2024-04-12', avatarColor: '#12b76a' },
    { id: 2, name: 'Ali Hassan', phone: '+255761234567', status: 'active', trustScore: 55, balance: 23500, kyc: 'unverified', joined: '2024-02-28', avatarColor: '#b5b833' },
    { id: 3, name: 'Peter Ochieng', phone: '+254711987654', status: 'active', trustScore: 67, balance: 54000, kyc: 'verified', joined: '2024-01-05', avatarColor: '#3037c4' },
    { id: 4, name: 'Samuel Mutua', phone: '+254728345678', status: 'inactive', trustScore: 60, balance: 12100, kyc: 'verified', joined: '2023-12-20', avatarColor: '#9c27b0' },
    { id: 5, name: 'Mercy Atieno', phone: '+254723456789', status: 'flagged', trustScore: 33, balance: 190000, kyc: 'failed', joined: '2023-09-11', avatarColor: '#0d8bc4' },
    { id: 6, name: 'Fatuma Osman', phone: '+255763421890', status: 'suspended', trustScore: 42, balance: 8200, kyc: 'pending', joined: '2023-07-22', avatarColor: '#12b76a' },
    { id: 7, name: 'Grace Muthoni', phone: '+254722654321', status: 'active', trustScore: 78, balance: 210000, kyc: 'verified', joined: '2023-05-19', avatarColor: '#12b76a' },
    { id: 8, name: 'Amina Wanjiku', phone: '+254712345678', status: 'active', trustScore: 84, balance: 127450, kyc: 'verified', joined: '2023-03-14', avatarColor: '#b5b833' },
    { id: 9, name: 'Brian Kiptoo', phone: '+254733112233', status: 'active', trustScore: 69, balance: 45600, kyc: 'verified', joined: '2023-02-02', avatarColor: '#e0622b' },
    { id: 10, name: 'Zainab Yusuf', phone: '+254799887766', status: 'inactive', trustScore: 48, balance: 5300, kyc: 'pending', joined: '2023-01-10', avatarColor: '#0d8bc4' },
  ];

  // ---- list state ----
  search = '';
  activeFilter: StatusFilter = 'all';
  sortKey: SortKey = 'joined';
  sortDir: 'asc' | 'desc' = 'desc';

  // ---- modal state ----
  modal: ModalType = null;
  selected: User | null = null;
  draft: Partial<User> = {};
  formErrors: { name?: string; phone?: string; balance?: string; trustScore?: string } = {};
  suspendReason = '';
  suspendNote = '';
  suspendError = '';

  // ---- toast ----
  toast: { message: string; type: 'success' | 'info' } | null = null;
  private toastTimer?: ReturnType<typeof setTimeout>;

  // ---------- derived ----------
  get filteredUsers(): User[] {
    const q = this.search.trim().toLowerCase();
    const list = this.users.filter((u) => {
      const matchesStatus = this.activeFilter === 'all' || u.status === this.activeFilter;
      const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.phone.replace(/\s/g, '').includes(q);
      return matchesStatus && matchesSearch;
    });
    const dir = this.sortDir === 'asc' ? 1 : -1;
    return list.sort((a, b) => {
      const av = a[this.sortKey];
      const bv = b[this.sortKey];
      return (av < bv ? -1 : av > bv ? 1 : 0) * dir;
    });
  }

  countFor(filter: StatusFilter): number {
    return filter === 'all' ? this.users.length : this.users.filter((u) => u.status === filter).length;
  }

  initials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('');
  }

  trustLevel(score: number): 'high' | 'mid' | 'low' {
    return score >= 60 ? 'high' : score >= 40 ? 'mid' : 'low';
  }

  trackById(_: number, u: User): number {
    return u.id;
  }

  // ---------- list actions ----------
  setFilter(f: StatusFilter): void {
    this.activeFilter = f;
  }

  sortBy(key: SortKey): void {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'desc';
    }
  }

  sortIcon(key: SortKey): string {
    if (this.sortKey !== key) return '⇅';
    return this.sortDir === 'asc' ? '▲' : '▼';
  }

  // ---------- modal open/close ----------
  openView(u: User): void {
    this.selected = u;
    this.modal = 'view';
  }

  openEdit(u: User): void {
    this.selected = u;
    this.draft = { name: u.name, phone: u.phone, status: u.status, kyc: u.kyc, balance: u.balance, trustScore: u.trustScore };
    this.formErrors = {};
    this.modal = 'edit';
  }

  openSuspend(u: User): void {
    this.selected = u;
    this.suspendReason = '';
    this.suspendNote = '';
    this.suspendError = '';
    this.modal = 'suspend';
  }

  openReinstate(u: User): void {
    this.selected = u;
    this.modal = 'reinstate';
  }

  closeModal(): void {
    this.modal = null;
    this.selected = null;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.modal) this.closeModal();
  }

  // ---------- modal submit ----------
  saveEdit(): void {
    if (!this.selected || !this.validateDraft()) return;
    const d = this.draft;
    Object.assign(this.selected, {
      name: d.name!.trim(),
      phone: d.phone!.replace(/\s/g, ''),
      status: d.status,
      kyc: d.kyc,
      balance: Number(d.balance),
      trustScore: Number(d.trustScore),
    });
    if (d.status !== 'suspended') delete this.selected.suspendReason;
    this.showToast(`${this.selected.name} updated`);
    this.closeModal();
  }

  confirmSuspend(): void {
    if (!this.selected) return;
    if (!this.suspendReason) {
      this.suspendError = 'Choose a reason for the suspension.';
      return;
    }
    this.selected.status = 'suspended';
    this.selected.suspendReason = this.suspendNote.trim()
      ? `${this.suspendReason}: ${this.suspendNote.trim()}`
      : this.suspendReason;
    this.showToast(`${this.selected.name} suspended`, 'info');
    this.closeModal();
  }

  confirmReinstate(): void {
    if (!this.selected) return;
    this.selected.status = 'active';
    delete this.selected.suspendReason;
    this.showToast(`${this.selected.name} reinstated`);
    this.closeModal();
  }

  // ---------- helpers ----------
  private validateDraft(): boolean {
    const d = this.draft;
    const e: typeof this.formErrors = {};
    if (!d.name || d.name.trim().length < 2) e.name = 'Enter the full name.';
    if (!d.phone || !/^\+\d{9,15}$/.test(d.phone.replace(/\s/g, ''))) {
      e.phone = 'Use international format, e.g. +254712345678.';
    }
    if (d.balance === null || d.balance === undefined || isNaN(Number(d.balance)) || Number(d.balance) < 0) {
      e.balance = 'Balance must be 0 or more.';
    }
    const t = Number(d.trustScore);
    if (isNaN(t) || t < 0 || t > 100) e.trustScore = 'Trust score must be between 0 and 100.';
    this.formErrors = e;
    return Object.keys(e).length === 0;
  }

  private showToast(message: string, type: 'success' | 'info' = 'success'): void {
    this.toast = { message, type };
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = null), 3000);
  }
}