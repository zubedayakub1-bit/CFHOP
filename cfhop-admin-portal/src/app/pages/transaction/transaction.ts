import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../shared/components/modal/modal';
import { ToastService } from '../../shared/toast/toast';
import { downloadCsv } from '../../shared/Csv';

type TxStatus = 'completed' | 'pending' | 'failed';
type TxFilter = 'all' | TxStatus;
type TxType = 'Chama' | 'Health' | 'Withdrawal' | 'Insurance' | 'Deposit' | 'Transfer';

interface Tx {
  id: string;
  user: string;
  type: TxType;
  amount: number;
  status: TxStatus;
  date: string;
  channel: string;
}

type WalletStatus = 'active' | 'frozen';

interface WalletAccount {
  id: string;
  member: string;
  phone: string;
  balance: number;
  dailyLimit: number;
  status: WalletStatus;
}

@Component({
  selector: 'app-ledger',
  imports: [CommonModule, FormsModule, DecimalPipe, TitleCasePipe],
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss',
})
export class Ledger {
  private readonly toast = inject(ToastService);

  readonly tab = signal<'wallets' | 'transactions'>('transactions');
  readonly filters: TxFilter[] = ['all', 'completed', 'pending', 'failed'];
  readonly types: TxType[] = ['Chama', 'Health', 'Withdrawal', 'Insurance', 'Deposit', 'Transfer'];

  // ---------- Transactions ----------
  readonly txs = signal<Tx[]>([
    { id: 'TXN-88421', user: 'Amina Wanjiku', type: 'Chama', amount: 5000, status: 'completed', date: '2026-09-22 14:32', channel: 'M-Pesa' },
    { id: 'TXN-88420', user: 'John Kamau', type: 'Health', amount: 12400, status: 'completed', date: '2026-09-22 14:24', channel: 'Wallet' },
    { id: 'TXN-88419', user: 'Fatuma Osman', type: 'Withdrawal', amount: 45000, status: 'pending', date: '2026-09-22 14:18', channel: 'Bank Transfer' },
    { id: 'TXN-88418', user: 'Peter Ochieng', type: 'Insurance', amount: 3500, status: 'failed', date: '2026-09-22 14:11', channel: 'M-Pesa' },
    { id: 'TXN-88417', user: 'Grace Muthoni', type: 'Deposit', amount: 20000, status: 'completed', date: '2026-09-22 13:47', channel: 'M-Pesa' },
    { id: 'TXN-88416', user: 'Ali Hassan', type: 'Transfer', amount: 8750, status: 'completed', date: '2026-09-22 13:24', channel: 'Wallet' },
    { id: 'TXN-88415', user: 'Mercy Atieno', type: 'Withdrawal', amount: 150000, status: 'pending', date: '2026-09-22 13:02', channel: 'Bank Transfer' },
    { id: 'TXN-88414', user: 'David Njoroge', type: 'Deposit', amount: 80000, status: 'completed', date: '2026-09-22 12:55', channel: 'M-Pesa' },
  ]);

  readonly search = signal('');
  readonly filter = signal<TxFilter>('all');
  readonly type = signal<TxType | ''>('');

  readonly visibleTxs = computed(() => {
    const q = this.search().trim().toLowerCase();
    const f = this.filter();
    const t = this.type();
    return this.txs().filter(
      (x) =>
        (f === 'all' || x.status === f) &&
        (!t || x.type === t) &&
        (!q || x.user.toLowerCase().includes(q) || x.id.toLowerCase().includes(q)),
    );
  });

  readonly typeTone: Record<TxType, string> = {
    Chama: 'blue', Health: 'green', Withdrawal: 'orange', Insurance: 'purple', Deposit: 'teal', Transfer: 'grey',
  };

  statusTone(s: TxStatus) { return s === 'completed' ? 'green' : s === 'pending' ? 'orange' : 'red'; }

  // ---------- Wallets ----------
  readonly wallets = signal<WalletAccount[]>([
    { id: 'WL-3001', member: 'Amina Wanjiku', phone: '+254712345678', balance: 127450, dailyLimit: 100000, status: 'active' },
    { id: 'WL-3002', member: 'John Kamau', phone: '+254733112233', balance: 48250, dailyLimit: 150000, status: 'active' },
    { id: 'WL-3003', member: 'Fatuma Osman', phone: '+255763421890', balance: 2100, dailyLimit: 50000, status: 'frozen' },
    { id: 'WL-3004', member: 'Peter Ochieng', phone: '+254711987654', balance: 54000, dailyLimit: 150000, status: 'active' },
    { id: 'WL-3005', member: 'Grace Muthoni', phone: '+254722654321', balance: 210000, dailyLimit: 200000, status: 'active' },
    { id: 'WL-3006', member: 'Mercy Atieno', phone: '+254723456789', balance: 190000, dailyLimit: 50000, status: 'frozen' },
  ]);

  readonly walletSearch = signal('');
  readonly visibleWallets = computed(() => {
    const q = this.walletSearch().trim().toLowerCase();
    return this.wallets().filter((w) => !q || w.member.toLowerCase().includes(q) || w.phone.includes(q));
  });

  initials(name: string) { return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase(); }

  // ---------- Modals: transactions ----------
  readonly txModal = signal(false);
  readonly selectedTx = signal<Tx | null>(null);

  openTx(t: Tx) { this.selectedTx.set(t); this.txModal.set(true); }
  closeTx() { this.txModal.set(false); this.selectedTx.set(null); }

  retry(t: Tx) {
    this.txs.update((l) => l.map((x) => (x.id === t.id ? { ...x, status: 'pending' } : x)));
    this.toast.show(`${t.id} sent for retry`, 'info');
    if (this.txModal()) this.closeTx();
  }

  approve(t: Tx) {
    this.txs.update((l) => l.map((x) => (x.id === t.id ? { ...x, status: 'completed' } : x)));
    this.toast.show(`${t.id} approved`);
    if (this.txModal()) this.closeTx();
  }

  exportCsv() {
    const rows = this.visibleTxs();
    downloadCsv('transaction-ledger.csv', [
      ['TX ID', 'User', 'Type', 'Amount (KES)', 'Status', 'Date', 'Channel'],
      ...rows.map((t) => [t.id, t.user, t.type, t.amount, t.status, t.date, t.channel]),
    ]);
    this.toast.show(`Exported ${rows.length} transactions`);
  }

  // ---------- Modals: wallets ----------
  readonly walletModal = signal<'topup' | 'freeze' | null>(null);
  readonly selectedWallet = signal<WalletAccount | null>(null);
  amount: number | null = null;
  amountSubmitted = false;

  get amountInvalid() { return !this.amount || this.amount <= 0; }

  openTopUp(w: WalletAccount) { this.selectedWallet.set(w); this.amount = null; this.amountSubmitted = false; this.walletModal.set('topup'); }
  openFreeze(w: WalletAccount) { this.selectedWallet.set(w); this.walletModal.set('freeze'); }
  closeWallet() { this.walletModal.set(null); this.selectedWallet.set(null); }

  confirmTopUp() {
    this.amountSubmitted = true;
    const w = this.selectedWallet();
    if (!w || this.amountInvalid) return;
    const amt = Number(this.amount);
    this.wallets.update((l) => l.map((x) => (x.id === w.id ? { ...x, balance: x.balance + amt } : x)));
    this.toast.show(`Added KES ${amt.toLocaleString()} to ${w.member}'s wallet`);
    this.closeWallet();
  }

  confirmFreeze() {
    const w = this.selectedWallet();
    if (!w) return;
    const next: WalletStatus = w.status === 'active' ? 'frozen' : 'active';
    this.wallets.update((l) => l.map((x) => (x.id === w.id ? { ...x, status: next } : x)));
    this.toast.show(`${w.member}'s wallet ${next === 'frozen' ? 'frozen' : 'unfrozen'}`, next === 'frozen' ? 'info' : 'success');
    this.closeWallet();
  }
}