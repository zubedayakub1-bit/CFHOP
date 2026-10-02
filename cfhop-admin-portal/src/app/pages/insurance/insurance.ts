import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface InsuranceProduct {
  provider: string;
  product: string;
  premium: number;
  coverage: number;
  policyholders: number;
  status: 'active' | 'inactive';
}

interface Policy {
  id: string;
  policyholder: string;
  product: string;
  premium: number;
  nextDue: string;
  status: 'active' | 'lapsed';
}

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insurance.html',
  styleUrl: './insurance.scss'
})
export class Insurance {

  products: InsuranceProduct[] = [
    {
      provider: 'Jubilee Insurance',
      product: 'MicroLife Basic',
      premium: 500,
      coverage: 100000,
      policyholders: 2840,
      status: 'active'
    },
    {
      provider: 'CIC Group',
      product: 'Group Health Cover',
      premium: 1200,
      coverage: 250000,
      policyholders: 1240,
      status: 'active'
    },
    {
      provider: 'Britam',
      product: 'Micro-Funeral Cover',
      premium: 300,
      coverage: 50000,
      policyholders: 5120,
      status: 'active'
    },
    {
      provider: 'AAR Insurance',
      product: 'Hospital Cash Plan',
      premium: 800,
      coverage: 200000,
      policyholders: 920,
      status: 'inactive'
    }
  ];

  policies: Policy[] = [
    {
      id: 'POL-001',
      policyholder: 'Amina Wanjiku',
      product: 'MicroLife Basic',
      premium: 500,
      nextDue: '2026-10-01',
      status: 'active'
    },
    {
      id: 'POL-002',
      policyholder: 'John Kamau',
      product: 'Group Health Cover',
      premium: 1200,
      nextDue: '2026-10-05',
      status: 'active'
    },
    {
      id: 'POL-003',
      policyholder: 'Grace Muthoni',
      product: 'Micro-Funeral Cover',
      premium: 300,
      nextDue: '2026-10-01',
      status: 'active'
    },
    {
      id: 'POL-004',
      policyholder: 'Fatuma Osman',
      product: 'MicroLife Basic',
      premium: 500,
      nextDue: '2026-09-15',
      status: 'lapsed'
    },
    {
      id: 'POL-005',
      policyholder: 'David Njoroge',
      product: 'Hospital Cash Plan',
      premium: 800,
      nextDue: '2026-10-10',
      status: 'active'
    }
  ];

  monthlyPremiums = 4820000;
  claimsThisMonth = 1140000;

  get activePolicies(): number {
    return 10080;
  }

  get claimsRatio(): number {
    return (this.claimsThisMonth / this.monthlyPremiums) * 100;
  }

  get activeProviders(): number {
    return this.products.filter(product => product.status === 'active').length;
  }

  formatMoney(amount: number): string {
    return new Intl.NumberFormat('en-KE').format(amount);
  }

  formatMillions(amount: number): string {
    return (amount / 1000000).toFixed(2) + 'M';
  }
}