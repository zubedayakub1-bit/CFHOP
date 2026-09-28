import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from '../topbar/topbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Topbar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  // Swap these for values from AuthService once it's wired up.
  readonly notificationCount = 5;
  readonly userName = 'Kariuki N.';
  readonly userRole = 'Super Admin';
  readonly userInitials = 'KN';
}