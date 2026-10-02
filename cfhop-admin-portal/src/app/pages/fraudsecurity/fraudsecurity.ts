import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FraudAlert {
  severity: 'low' | 'medium' | 'high' | 'critical';
  id: string;
  status: 'open' | 'investigating' | 'resolved';
  user: string;
  description: string;
  transactionId: string;
  amount: number;
  riskScore: number;
  time: string;
}

interface RiskFactor {
  name: string;
  score: number;
}

@Component({
  selector: 'app-fraud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fraudsecurity.html',
  styleUrl: './fraudsecurity.scss'
})
export class Fraud {

  openAlerts = 4;
  investigating = 1;
  resolvedToday = 8;
  averageRiskScore = 73.4;

  alerts: FraudAlert[] = [
    {
      severity: 'high',
      id: 'FRD-001',
      status: 'investigating',
      user: 'Mercy Atieno',
      description: 'Unusual withdrawal pattern — 3× monthly average',
      transactionId: 'TXN-88415',
      amount: 150000,
      riskScore: 87,
      time: '1 hr ago'
    },
    {
      severity: 'medium',
      id: 'FRD-002',
      status: 'open',
      user: 'Fatuma Osman',
      description: 'Account suspended — attempted withdrawal',
      transactionId: 'TXN-88419',
      amount: 45000,
      riskScore: 72,
      time: '14 min ago'
    },
    {
      severity: 'critical',
      id: 'FRD-003',
      status: 'investigating',
      user: 'Unknown Device',
      description: 'Multiple failed PINs + new device',
      transactionId: 'TXN-88405',
      amount: 12000,
      riskScore: 95,
      time: '3 hr ago'
    },
    {
      severity: 'low',
      id: 'FRD-004',
      status: 'resolved',
      user: 'Ali Hassan',
      description: 'First-time international transfer',
      transactionId: 'TXN-88390',
      amount: 8750,
      riskScore: 45,
      time: '6 hr ago'
    },
    {
      severity: 'medium',
      id: 'FRD-005',
      status: 'open',
      user: 'Halima Abdi',
      description: 'Velocity check: 8 transactions in 2 hours',
      transactionId: 'TXN-88381',
      amount: 3200,
      riskScore: 68,
      time: '8 hr ago'
    }
  ];

  riskFactors: RiskFactor[] = [
    {
      name: 'Velocity anomaly',
      score: 85
    },
    {
      name: 'Device fingerprint mismatch',
      score: 72
    },
    {
      name: 'Geographic inconsistency',
      score: 60
    },
    {
      name: 'Unusual withdrawal time',
      score: 45
    },
    {
      name: 'New payee',
      score: 30
    }
  ];

  selectedAlert: FraudAlert = this.alerts[0];

  formatKES(amount: number): string {
    return new Intl.NumberFormat('en-KE', {
      maximumFractionDigits: 0
    }).format(amount);
  }

  selectAlert(alert: FraudAlert): void {
    this.selectedAlert = alert;
  }

  markResolved(): void {
    this.selectedAlert.status = 'resolved';
  }

  startInvestigation(): void {
    this.selectedAlert.status = 'investigating';
  }

  freezeUser(): void {
    alert(`Freeze account action started for ${this.selectedAlert.user}.`);
  }
}