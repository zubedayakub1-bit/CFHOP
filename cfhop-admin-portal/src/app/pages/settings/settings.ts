import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface AdminRole {
  name: string;
  admins: number;
  permissions: number;
}

interface Permission {
  name: string;
  enabled: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {

  userName = 'Zubeda Yakub';
  userInitials = 'ZY';
  userRole = 'Super Admin';

  activeTab: 'roles' | 'config' = 'roles';

  selectedRole = 'SUPER_ADMIN';

  roles: AdminRole[] = [
    {
      name: 'SUPER_ADMIN',
      admins: 2,
      permissions: 18
    },
    {
      name: 'USER_ADMIN',
      admins: 4,
      permissions: 5
    },
    {
      name: 'FINANCE_ADMIN',
      admins: 6,
      permissions: 6
    },
    {
      name: 'HEALTH_ADMIN',
      admins: 3,
      permissions: 5
    },
    {
      name: 'INSURANCE_ADMIN',
      admins: 2,
      permissions: 4
    },
    {
      name: 'FRAUD_ANALYST',
      admins: 5,
      permissions: 4
    },
    {
      name: 'REPORTING_ADMIN',
      admins: 4,
      permissions: 3
    }
  ];

  permissions: Permission[] = [
    { name: 'users.read', enabled: true },
    { name: 'users.write', enabled: true },
    { name: 'users.suspend', enabled: true },

    { name: 'wallets.read', enabled: true },
    { name: 'wallets.write', enabled: true },
    { name: 'wallets.freeze', enabled: true },

    { name: 'transactions.read', enabled: true },
    { name: 'transactions.flag', enabled: true },

    { name: 'health.read', enabled: true },
    { name: 'health.write', enabled: true },

    { name: 'clinics.manage', enabled: true },

    { name: 'insurance.read', enabled: true },
    { name: 'insurance.write', enabled: true },

    { name: 'fraud.read', enabled: true },
    { name: 'fraud.write', enabled: true },

    { name: 'reports.read', enabled: true },
    { name: 'reports.export', enabled: true }
  ];

  selectTab(tab: 'roles' | 'config'): void {
    this.activeTab = tab;
  }

  selectRole(role: AdminRole): void {
    this.selectedRole = role.name;
  }

  enabledPermissions(): number {
    return this.permissions.filter(permission => permission.enabled).length;
  }
}