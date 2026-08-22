import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  @ViewChild('contactForm') contactForm!: NgForm;

  readonly data = contactData;

  name    = '';
  email   = '';
  message = '';
  sent    = signal(false);
  sending = signal(false);
  error   = signal('');

  /** true when running on localhost — Formspree AJAX needs reCAPTCHA disabled in form settings */
  readonly isLocalhost = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  submit(): void {
    // Touch all fields so errors appear immediately on submit attempt
    if (this.contactForm?.invalid) {
      this.contactForm.form.markAllAsTouched();
      return;
    }

    if (this.isLocalhost) {
      this.error.set(
        'Form submissions are disabled on localhost. ' +
        'Deploy to Vercel (or disable reCAPTCHA in Formspree → Form Settings) to test.'
      );
      return;
    }

    this.sending.set(true);
    this.error.set('');

    fetch(environment.formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: this.name, email: this.email, message: this.message }),
    })
      .then(res => res.ok ? res : res.json().then(j => Promise.reject(j)))
      .then(() => {
        this.sent.set(true);
        this.name = this.email = this.message = '';
      })
      .catch((err: { error?: string }) => {
        this.error.set(err?.error ?? 'Submission failed. Please try again.');
      })
      .finally(() => this.sending.set(false));
  }

  reset(): void { this.sent.set(false); this.error.set(''); }
}
