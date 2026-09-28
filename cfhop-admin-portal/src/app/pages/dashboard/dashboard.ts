import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  label: string;
  value: string;
  deltaLabel: string;
  trend: 'up' | 'down';
  icon: 'users' | 'wallet' | 'swap' | 'alert';
  tone: 'indigo' | 'teal' | 'violet' | 'red';
  sparkline: number[];
}

type CashFlowPeriod = '7d' | '30d' | '90d';

interface CashFlowSet {
  labels: string[];
  inflow: number[];
  outflow: number[];
}

interface TrustBin {
  range: string;
  value: number;
}

interface ActivityRow {
  user: string;
  initials: string;
  type: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Flagged';
  time: string;
}

interface Opportunity {
  title: string;
  category: string;
  filled: number;
  total: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard{
  // ---- Stat cards -------------------------------------------------
  readonly stats: StatCard[] = [
    {
      label: 'Total Users',
      value: '48,320',
      deltaLabel: '12.4% vs prev month',
      trend: 'up',
      icon: 'users',
      tone: 'indigo',
      sparkline: [4, 5, 5, 7, 6, 8, 9],
    },
    {
      label: 'Total Wallet Balance',
      value: '184.9M',
      deltaLabel: '8.7% vs prev month · KES across all accounts',
      trend: 'up',
      icon: 'wallet',
      tone: 'teal',
      sparkline: [5, 6, 5, 7, 8, 9, 9.5],
    },
    {
      label: 'Transactions Today',
      value: '3,847',
      deltaLabel: '2.1% vs yesterday',
      trend: 'down',
      icon: 'swap',
      tone: 'violet',
      sparkline: [7, 6, 8, 5, 6, 5, 4.5],
    },
    {
      label: 'Active Fraud Alerts',
      value: '23',
      deltaLabel: '4.0% requires review',
      trend: 'up',
      icon: 'alert',
      tone: 'red',
      sparkline: [3, 4, 3.5, 5, 4, 6, 6.5],
    },
  ];

  // ---- Cash flow chart ---------------------------------------------
  readonly period = signal<CashFlowPeriod>('7d');
  readonly periods: CashFlowPeriod[] = ['7d', '30d', '90d'];

  private readonly cashFlowData: Record<CashFlowPeriod, CashFlowSet> = {
    '7d': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      inflow: [3.8, 4.9, 5.6, 6.4, 7.3, 6.5, 5.1],
      outflow: [2.6, 3.1, 2.9, 3.6, 4.0, 3.5, 2.8],
    },
    '30d': {
      labels: ['W1', 'W2', 'W3', 'W4'],
      inflow: [22.4, 26.1, 24.8, 29.6],
      outflow: [14.2, 15.8, 15.1, 17.4],
    },
    '90d': {
      labels: ['Jul', 'Aug', 'Sep'],
      inflow: [88.5, 96.2, 104.7],
      outflow: [56.3, 60.9, 65.4],
    },
  };

  private readonly chartWidth = 640;
  private readonly chartHeight = 180;

  readonly activeSet = computed(() => this.cashFlowData[this.period()]);

  readonly inflowAreaPath = computed(() =>
    this.buildAreaPath(this.activeSet().inflow),
  );
  readonly outflowLinePath = computed(() =>
    this.buildLinePath(this.activeSet().outflow),
  );

  setPeriod(p: CashFlowPeriod): void {
    this.period.set(p);
  }

  private scale(values: number[]): { min: number; max: number } {
    const all = [...this.activeSet().inflow, ...this.activeSet().outflow];
    const max = Math.max(...all) * 1.15;
    return { min: 0, max };
  }

  private toPoints(values: number[]): { x: number; y: number }[] {
    const { min, max } = this.scale(values);
    const w = this.chartWidth;
    const h = this.chartHeight;
    return values.map((v, i) => ({
      x: (i / (values.length - 1)) * w,
      y: h - ((v - min) / (max - min)) * h,
    }));
  }

  private buildLinePath(values: number[]): string {
    const points = this.toPoints(values);
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      d += ` C ${midX.toFixed(1)} ${p0.y.toFixed(1)}, ${midX.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
    return d;
  }

  private buildAreaPath(values: number[]): string {
    const line = this.buildLinePath(values);
    return `${line} L ${this.chartWidth} ${this.chartHeight} L 0 ${this.chartHeight} Z`;
  }

  // ---- Trust score distribution -------------------------------------
  readonly trustBins: TrustBin[] = [
    { range: '0-10', value: 210 },
    { range: '11-20', value: 540 },
    { range: '21-30', value: 980 },
    { range: '31-40', value: 2150 },
    { range: '41-50', value: 4300 },
    { range: '51-60', value: 7600 },
    { range: '61-70', value: 9400 },
    { range: '71-80', value: 8300 },
    { range: '81-90', value: 6900 },
    { range: '91-100', value: 2200 },
  ];

  readonly trustAverage = 71.4;
  readonly trustAverageDelta = 4.2;

  readonly maxTrustBin = Math.max(...this.trustBins.map((b) => b.value));

  readonly totalScoredUsers = this.trustBins.reduce(
    (sum, b) => sum + b.value,
    0,
  );

  barHeightPct(value: number): number {
    return (value / this.maxTrustBin) * 100;
  }

  // ---- Recent activity -----------------------------------------------
  readonly recentActivity: ActivityRow[] = [
    { user: 'Wanjiru M.', initials: 'WM', type: 'Deposit', amount: 'KES 12,500', status: 'Completed', time: '2m ago' },
    { user: 'Otieno K.', initials: 'OK', type: 'Loan Repayment', amount: 'KES 4,800', status: 'Completed', time: '6m ago' },
    { user: 'Nafula B.', initials: 'NB', type: 'Withdrawal', amount: 'KES 9,200', status: 'Pending', time: '11m ago' },
    { user: 'Kiptoo S.', initials: 'KS', type: 'Chama Contribution', amount: 'KES 2,000', status: 'Completed', time: '18m ago' },
    { user: 'Achieng D.', initials: 'AD', type: 'Transfer', amount: 'KES 31,000', status: 'Flagged', time: '24m ago' },
  ];

  statusClass(status: ActivityRow['status']): string {
    return status.toLowerCase();
  }

  // ---- Opportunities ---------------------------------------------------
  readonly opportunities: Opportunity[] = [
    { title: 'Fresh Produce Bulk Buyer', category: 'Trade', filled: 124, total: 150 },
    { title: 'School Fees Group Loan', category: 'Education', filled: 68, total: 100 },
    { title: 'Boda Boda Insurance Pool', category: 'Insurance', filled: 41, total: 80 },
  ];

  fillPct(o: Opportunity): number {
    return Math.min(100, (o.filled / o.total) * 100);
  }

  // ---- Mini sparkline for stat cards -----------------------------------
  sparklinePath(values: number[], w = 64, h = 26): string {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const points = values.map((v, i) => ({
      x: (i / (values.length - 1)) * w,
      y: h - ((v - min) / range) * h,
    }));
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      d += ` C ${midX.toFixed(1)} ${p0.y.toFixed(1)}, ${midX.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
    return d;
  }
}