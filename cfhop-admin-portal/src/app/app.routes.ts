import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Members } from './pages/members/members';
import { Wallets } from './pages/wallet/wallet';


export const routes: Routes = [
    {
path: '',
component: AdminLayout,
children: [ 
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component : Dashboard},
    {path: 'Users', component : Members},
    {path: 'wallets', component :Wallets}


    
],
        
        
        

    }
   
];
