import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import contactData from '../../data/contact.json';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  // ── Social links & email come from contact.json ──
  readonly data = contactData;

  name    = '';
  email   = '';
  message = '';
  sent    = signal(false);
  sending = signal(false);

  submit(): void {
    if (!this.name || !this.email || !this.message) return;
    this.sending.set(true);
    // Mocked — wire to real backend later
    setTimeout(() => {
      this.sending.set(false);
      this.sent.set(true);
      this.name = this.email = this.message = '';
    }, 1500);
  }

  reset(): void { this.sent.set(false); }
}
