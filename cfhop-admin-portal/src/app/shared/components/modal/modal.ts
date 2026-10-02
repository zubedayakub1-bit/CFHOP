import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  host: { '(document:keydown.escape)': 'closed.emit()' },
})
export class Modal {
  title = input.required<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  closed = output<void>();
}