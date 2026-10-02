import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

  userInitials = 'ZY';
  userName = 'Zubeda Yakub';
  userRole = 'Super Administrator';

  email = 'zubeda@cfhop.com';
  phone = '+254 700 000 000';
  department = 'Administration';

  accountStatus = 'Active account';
  lastSignIn = 'Today, 08:42 EAT';
  accessLevel = 'Full platform';
  twoFactorStatus = 'Enabled';

  saveProfile(): void {
    alert('Profile updated successfully.');
  }

  changePassword(): void {
    alert('Change password feature is ready for backend integration.');
  }
}