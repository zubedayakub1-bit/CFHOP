import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../shared/components/modal/modal';
import { ToastService } from '../../shared/toast/toast';

type ClinicStatus = 'verified' | 'pending' | 'suspended';
type PaymentStatus = 'completed' | 'pending' | 'failed';

interface Clinic {
  id: string;
  name: string;
  region: string;
  type: string;
  status: ClinicStatus;
  payments: number;
}

interface Category { name: string; used: number; total: number; }

interface Payment {
  user: string;
  clinic: string;
  amount: number;
  date: string;
  status: PaymentStatus;
}

@Component({
  selector: 'app-health',
  imports: [FormsModule, DecimalPipe, Modal],
  templateUrl: './financialhealth.html',
  styleUrl: './financialhealth.scss',
})
export class Health {
  private readonly toast = inject(ToastService);

  // ---------- Stats ----------
  readonly aggregateBuffer = 12_500_000;
  readonly bufferUsers = 8920;
  readonly utilizationRate = 68;
  readonly activeBuffers = 8920;
  readonly avgBuffer = 1400;

  // ---------- Trend ----------
  readonly trend = [
    { m: 'Apr', v: 52 }, { m: 'May', v: 58 }, { m: 'Jun', v: 61 },
    { m: 'Jul', v: 59 }, { m: 'Aug', v: 64 }, { m: 'Sep', v: 68 },
  ];

  private readonly trendStep = 320 / (this.trend.length - 1);
  readonly trendPoints = this.trend
    .map((t, i) => `${i * this.trendStep},${140 - t.v * 1.6}`)
    .join(' ');

  trendX(i: number) { return i * this.trendStep; }
  trendY(v: number) { return 140 - v * 1.6; }

  // ---------- Categories ----------
  readonly categories: Category[] = [
    { name: 'Outpatient Visits', used: 4_200_000, total: 5_000_000 },
    { name: 'Prescriptions', used: 2_800_000, total: 4_000_000 },
    { name: 'Diagnostics & Lab', used: 1_900_000, total: 2_500_000 },
    { name: 'Emergency Care', used: 1_400_000, total: 3_000_000 },
    { name: 'Maternal Health', used: 2_200_000, total: 2_500_000 },
  ];
  pct(c: Category) { return Math.round((c.used / c.total) * 100); }

  // ---------- Clinics ----------
  readonly clinics = signal<Clinic[]>([
    { id: 'CLN-001', name: 'Nairobi Community Clinic', region: 'Nairobi', type: 'outpatient', status: 'verified', payments: 142 },
    { id: 'CLN-002', name: 'Mombasa Medical Centre', region: 'Mombasa', type: 'general', status: 'verified', payments: 89 },
    { id: 'CLN-003', name: 'Kisumu Wellness Hub', region: 'Kisumu', type: 'outpatient', status: 'pending', payments: 0 },
    { id: 'CLN-004', name: 'Eldoret Family Health', region: 'Eldoret', type: 'general', status: 'verified', payments: 54 },
    { id: 'CLN-005', name: 'Dar City Hospital', region: 'Dar es Salaam', type: 'inpatient', status: 'suspended', payments: 0 },
  ]);

  clinicTone(s: ClinicStatus) { return s === 'verified' ? 'green' : s === 'pending' ? 'orange' : 'red'; }
  actionLabel(c: Clinic) { return c.status === 'verified' ? 'Suspend' : 'Verify'; }

  readonly clinicModal = signal(false);
  readonly selectedClinic = signal<Clinic | null>(null);

  openClinicAction(c: Clinic) { this.selectedClinic.set(c); this.clinicModal.set(true); }
  closeClinicModal() { this.clinicModal.set(false); this.selectedClinic.set(null); }

  confirmClinicAction() {
    const c = this.selectedClinic();
    if (!c) return;
    const next: ClinicStatus = c.status === 'verified' ? 'suspended' : 'verified';
    this.clinics.update((l) => l.map((x) => (x.id === c.id ? { ...x, status: next } : x)));
    this.toast.show(`${c.name} ${next === 'verified' ? 'verified' : 'suspended'}`, next === 'verified' ? 'success' : 'info');
    this.closeClinicModal();
  }

  // ---------- Payments ----------
  readonly payments = signal<Payment[]>([
    { user: 'Amina Wanjiku', clinic: 'Nairobi Community Clinic', amount: 3200, date: '2026-09-22', status: 'completed' },
    { user: 'John Kamau', clinic: 'Mombasa Medical Centre', amount: 12400, date: '2026-09-22', status: 'completed' },
    { user: 'Grace Muthoni', clinic: 'Eldoret Family Health', amount: 5800, date: '2026-09-21', status: 'completed' },
    { user: 'David Njoroge', clinic: 'Nairobi Community Clinic', amount: 2100, date: '2026-09-20', status: 'pending' },
    { user: 'Halima Abdi', clinic: 'Mombasa Medical Centre', amount: 8900, date: '2026-09-19', status: 'completed' },
  ]);

  paymentTone(s: PaymentStatus) { return s === 'completed' ? 'green' : s === 'pending' ? 'orange' : 'red'; }

  readonly paymentModal = signal(false);
  readonly selectedPayment = signal<Payment | null>(null);

  openPayment(p: Payment) { this.selectedPayment.set(p); this.paymentModal.set(true); }
  closePaymentModal() { this.paymentModal.set(false); this.selectedPayment.set(null); }

  approvePayment(p: Payment) {
    this.payments.update((l) => l.map((x) => (x === p || (x.user === p.user && x.date === p.date) ? { ...x, status: 'completed' } : x)));
    this.toast.show(`Payment to ${p.clinic} for ${p.user} approved`);
    if (this.paymentModal()) this.closePaymentModal();
  }
}