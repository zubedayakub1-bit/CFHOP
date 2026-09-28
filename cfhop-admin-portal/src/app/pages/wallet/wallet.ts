import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Wallet {
  id: string;
  account: string;
  accountId: string;
  type: 'personal' | 'chama' | 'sacco';
  balance: number;
  status: 'active' | 'frozen';
  lastTransaction: string;
}

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet.html',
  styleUrl: './wallet.scss'
})
export class Wallets {

  wallets: Wallet[] = [
    {
      id: 'WAL-001',
      account: 'Amina Wanjiku',
      accountId: 'USR-001',
      type: 'personal',
      balance: 127450,
      status: 'active',
      lastTransaction: '2026-09-22'
    },
    {
      id: 'WAL-002',
      account: 'John Kamau',
      accountId: 'USR-002',
      type: 'personal',
      balance: 342800,
      status: 'active',
      lastTransaction: '2026-09-22'
    },
    {
      id: 'WAL-003',
      account: 'Fatuma Osman',
      accountId: 'USR-003',
      type: 'personal',
      balance: 8200,
      status: 'frozen',
      lastTransaction: '2026-09-10'
    },
    {
      id: 'WAL-C001',
      account: 'Umoja Chama',
      accountId: 'CHA-001',
      type: 'chama',
      balance: 1240000,
      status: 'active',
      lastTransaction: '2026-09-22'
    },
    {
      id: 'WAL-C002',
      account: 'Maendeleo SACCO',
      accountId: 'CHA-002',
      type: 'sacco',
      balance: 8920000,
      status: 'active',
      lastTransaction: '2026-09-21'
    }
  ];

  searchTerm = '';
  selectedType = 'all';

  selectedWallet: Wallet | null = null;

  showViewModal = false;
  showFreezeModal = false;

  walletToFreeze: Wallet | null = null;


  // Search and filter
  get filteredWallets(): Wallet[] {

    return this.wallets.filter(wallet => {

      const matchesSearch =
        wallet.account.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        wallet.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        wallet.accountId.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType =
        this.selectedType === 'all' ||
        wallet.type === this.selectedType;

      return matchesSearch && matchesType;
    });
  }


  // Format money
  formatCurrency(amount: number): string {

    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(amount);

  }


  // View wallet
  viewWallet(wallet: Wallet) {

    this.selectedWallet = wallet;
    this.showViewModal = true;

  }


  // Close view modal
  closeViewModal() {

    this.showViewModal = false;
    this.selectedWallet = null;

  }


  // Open freeze confirmation
  confirmFreeze(wallet: Wallet) {

    this.walletToFreeze = wallet;
    this.showFreezeModal = true;

  }


  // Freeze wallet
  freezeWallet() {

    if (this.walletToFreeze) {

      this.walletToFreeze.status = 'frozen';

    }

    this.closeFreezeModal();

  }


  // Unfreeze wallet
  unfreezeWallet(wallet: Wallet) {

    wallet.status = 'active';

  }


  // Close freeze modal
  closeFreezeModal() {

    this.showFreezeModal = false;
    this.walletToFreeze = null;

  }

}