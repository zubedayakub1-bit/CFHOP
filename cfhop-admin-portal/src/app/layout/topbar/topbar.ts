import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  @Input() eyebrow = 'CFHOP Admin';
  @Input() title = 'Financial Overview';
  @Input() searchPlaceholder = 'Search users, transactions, chamas...';
  @Input() notificationCount = 0;
  @Input() roleLabel = 'SUPER_ADMIN';
  @Input() userName = '';
  @Input() userRole = '';
  @Input() userInitials = '';

  readonly today = new Date();

  onSearch(term: string): void {
    // Wire this up to a search service / query param once the search
    // endpoint exists. Left as an output-free method so the template
    // has somewhere to call into.
  }
}