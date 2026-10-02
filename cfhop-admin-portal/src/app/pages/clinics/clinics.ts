import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Clinic {
  name: string;
  id: string;
  region: string;
  facilityType: string;
  monthlyPayments: number;
  status: 'verified' | 'pending' | 'suspended';
}

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinics.html',
  styleUrl: './clinics.scss'
})
export class Clinics {

  partnerClinics = 128;
  verifiedClinics = 112;
  pendingClinics = 11;
  monthlyPayments = 8400000;

  clinics: Clinic[] = [
    {
      name: 'Nairobi Community Clinic',
      id: 'CLN-001',
      region: 'Nairobi',
      facilityType: 'Outpatient',
      monthlyPayments: 142,
      status: 'verified'
    },
    {
      name: 'Mombasa Medical Centre',
      id: 'CLN-002',
      region: 'Mombasa',
      facilityType: 'General',
      monthlyPayments: 89,
      status: 'verified'
    },
    {
      name: 'Kisumu Wellness Hub',
      id: 'CLN-003',
      region: 'Kisumu',
      facilityType: 'Outpatient',
      monthlyPayments: 0,
      status: 'pending'
    },
    {
      name: 'Eldoret Family Health',
      id: 'CLN-004',
      region: 'Eldoret',
      facilityType: 'General',
      monthlyPayments: 54,
      status: 'verified'
    },
    {
      name: 'Dar City Hospital',
      id: 'CLN-005',
      region: 'Dar es Salaam',
      facilityType: 'Inpatient',
      monthlyPayments: 0,
      status: 'suspended'
    }
  ];

  formatKES(amount: number): string {
    return new Intl.NumberFormat('en-KE', {
      maximumFractionDigits: 0
    }).format(amount);
  }

  reviewClinic(clinic: Clinic): void {
    alert(`Reviewing ${clinic.name} (${clinic.id})`);
  }
}