import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Members } from './pages/members/members';
import { Wallets } from './pages/wallet/wallet';
import { Ledger } from './pages/transaction/transaction';
import { Health } from './pages/financialhealth/financialhealth';
import { Insurance } from './pages/insurance/insurance';
import { Savings } from './pages/savings/savings';
import { Clinics } from './pages/clinics/clinics';
import { Fraud } from './pages/fraudsecurity/fraudsecurity';
import { Notifications } from './pages/notification/notification';
import { Reports } from './pages/reports/reports';
import { Settings } from './pages/settings/settings';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [

  // DEFAULT PAGE
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // LOGIN
  {
    path: 'login',
    component: Login
  },

  // ADMIN CONSOLE
  {
    path: '',
    component: AdminLayout,

    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'Users', component: Members },
      { path: 'wallets', component: Wallets },
      { path: 'Transactions', component: Ledger },
      { path: 'health', component: Health },
      { path: 'insurance', component: Insurance },
      { path: 'savings', component: Savings },
      { path: 'clinics', component: Clinics },
      { path: 'fraud', component: Fraud },
      { path: 'notifications', component: Notifications },
      { path: 'reports', component: Reports },
      { path: 'settings', component: Settings },
      { path: 'profile', component: Profile },
      { path: 'logout', redirectTo: '/login' }
    ]
  }

];