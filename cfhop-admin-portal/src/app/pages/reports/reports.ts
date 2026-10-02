import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Report {
  name: string;
  modules: string;
  date: string;
  size: string;
  format: 'PDF' | 'CSV';
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss'
})
export class Reports {

  startDate = '2026-08-01';
  endDate = '2026-08-31';

  selectedModule = 'Users';
  selectedFormat = 'CSV';

  modules = [
    'Users',
    'Wallets',
    'Transactions',
    'Health',
    'Insurance',
    'Fraud'
  ];

  formats = [
    'CSV',
    'PDF'
  ];

  recentReports: Report[] = [
    {
      name: 'Monthly Financial Summary — Aug 2026',
      modules: 'Wallets, Transactions',
      date: '2026-09-01',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      name: 'Fraud Incidents Q3 2026',
      modules: 'Fraud',
      date: '2026-09-10',
      size: '340 KB',
      format: 'CSV'
    },
    {
      name: 'User Growth & Trust Scores',
      modules: 'Users',
      date: '2026-09-15',
      size: '1.1 MB',
      format: 'CSV'
    },
    {
      name: 'Health Buffer Utilization',
      modules: 'Health',
      date: '2026-09-18',
      size: '890 KB',
      format: 'PDF'
    }
  ];

  generateReport(): void {
    alert(
      `${this.selectedFormat} report generated for ${this.selectedModule}.`
    );
  }

  downloadReport(report: Report): void {
    alert(`Downloading ${report.name}`);
  }
}