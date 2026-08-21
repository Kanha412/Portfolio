import { Component, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import botData from '../../data/chatbot.json';

interface Message { role: 'user' | 'bot'; text: string; time: string; }

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('msgContainer') msgContainer!: ElementRef<HTMLDivElement>;

  // ── All bot text & knowledge base from chatbot.json ──
  readonly bot = botData;

  isOpen   = signal(false);
  isTyping = signal(false);
  input    = '';

  messages = signal<Message[]>([
    { role: 'bot', text: this.bot.greeting, time: this.now() },
  ]);

  get suggestions() { return this.bot.suggestions; }

  toggle(): void { this.isOpen.update(v => !v); }

  send(text?: string): void {
    const msg = (text ?? this.input).trim();
    if (!msg) return;
    this.input = '';
    this.messages.update(m => [...m, { role: 'user', text: msg, time: this.now() }]);
    this.isTyping.set(true);
    setTimeout(() => {
      this.isTyping.set(false);
      this.messages.update(m => [...m, { role: 'bot', text: this.respond(msg), time: this.now() }]);
    }, 900 + Math.random() * 600);
  }

  onEnter(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
  }

  private respond(msg: string): string {
    for (const entry of this.bot.knowledgeBase) {
      if (new RegExp(entry.pattern, 'i').test(msg)) return entry.response;
    }
    return this.bot.fallback;
  }

  private now(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  ngAfterViewChecked(): void {
    if (this.msgContainer) {
      const el = this.msgContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  formatText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }
}
