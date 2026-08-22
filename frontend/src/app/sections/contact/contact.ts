import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import contactData from '../../data/contact.json';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  // ── Social links come from contact.json ──
  readonly data = contactData;

  name    = '';
  email   = '';
  message = '';
  sent    = signal(false);
  sending = signal(false);
  error   = signal('');

  async submit(): Promise<void> {
    if (!this.name || !this.email || !this.message) return;
    this.sending.set(true);
    this.error.set('');

    try {
      const res = await fetch(environment.formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: this.name, email: this.email, message: this.message }),
      });

      if (res.ok) {
        this.sent.set(true);
        this.name = this.email = this.message = '';
      } else {
        const json = await res.json().catch(() => ({}));
        this.error.set((json as { error?: string }).error ?? 'Submission failed. Please try again.');
      }
    } catch {
      this.error.set('Network error. Please check your connection and try again.');
    } finally {
      this.sending.set(false);
    }
  }

  reset(): void { this.sent.set(false); this.error.set(''); }
}
