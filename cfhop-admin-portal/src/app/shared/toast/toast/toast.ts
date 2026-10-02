import { Component, inject } from '@angular/core';
import { ToastService } from '../toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  readonly service = inject(ToastService);
}