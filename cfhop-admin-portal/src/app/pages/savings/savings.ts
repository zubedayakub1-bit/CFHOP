import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SavingsGoal {
  name: string;
  group: string;
  due: string;
  saved: number;
  target: number;
}

interface SavingsGroup {
  name: string;
  id: string;
  region: string;
  members: number;
  balance: number;
  status: 'active' | 'suspended';
}

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './savings.html',
  styleUrl: './savings.scss'
})
export class Savings {

  totalGroupSavings = 18600000;
  activeGroups = 326;
  contributors = 4820;
  averageContribution = 3860;

  goals: SavingsGoal[] = [
    {
      name: 'Umoja Emergency Fund',
      group: 'Umoja Women Chama',
      due: 'Dec 2026',
      saved: 840000,
      target: 1000000
    },
    {
      name: 'Market Expansion',
      group: 'Maendeleo SACCO',
      due: 'Mar 2027',
      saved: 2650000,
      target: 4000000
    },
    {
      name: 'School Fees Pool',
      group: 'Karibu Women Savings',
      due: 'Jan 2027',
      saved: 480000,
      target: 600000
    }
  ];

  groups: SavingsGroup[] = [
    {
      name: 'Umoja Women Chama',
      id: 'CHA-001',
      region: 'Nairobi',
      members: 24,
      balance: 1240000,
      status: 'active'
    },
    {
      name: 'Maendeleo SACCO',
      id: 'CHA-002',
      region: 'Mombasa',
      members: 180,
      balance: 8920000,
      status: 'active'
    },
    {
      name: 'Vijana Invest Club',
      id: 'CHA-003',
      region: 'Kisumu',
      members: 12,
      balance: 340000,
      status: 'active'
    },
    {
      name: 'Jua Kali Welfare Group',
      id: 'CHA-004',
      region: 'Nakuru',
      members: 35,
      balance: 2100000,
      status: 'active'
    },
    {
      name: 'Karibu Women Savings',
      id: 'CHA-005',
      region: 'Eldoret',
      members: 18,
      balance: 620000,
      status: 'suspended'
    },
    {
      name: 'Dar es Salaam Growth Fund',
      id: 'CHA-006',
      region: 'Dar es Salaam',
      members: 56,
      balance: 4380000,
      status: 'active'
    }
  ];

  getGoalProgress(goal: SavingsGoal): number {
    return Math.round((goal.saved / goal.target) * 100);
  }

  formatKES(amount: number): string {
    return new Intl.NumberFormat('en-KE', {
      maximumFractionDigits: 0
    }).format(amount);
  }

  createGoal(): void {
    alert('Create savings goal feature is ready for backend integration.');
  }
}