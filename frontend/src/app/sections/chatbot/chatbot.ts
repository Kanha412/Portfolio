import { Component, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import botData from '../../data/chatbot.json';
import { buildSystemPrompt } from '../../data/ai-context';
import { environment } from '../../../environments/environment';

interface Message { role: 'user' | 'bot'; text: string; time: string; }

// Gemini REST API types
interface GeminiPart    { text: string; }
interface GeminiContent { role: 'user' | 'model'; parts: GeminiPart[]; }

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('msgContainer') msgContainer!: ElementRef<HTMLDivElement>;

  // ── All bot text from chatbot.json ──
  readonly bot = botData;

  isOpen   = signal(false);
  isTyping = signal(false);
  input    = '';

  messages = signal<Message[]>([
    { role: 'bot', text: this.bot.greeting, time: this.now() },
  ]);

  // Full conversation history for Gemini multi-turn context
  private history: GeminiContent[] = [];

  get suggestions() { return this.bot.suggestions; }

  toggle(): void { this.isOpen.update(v => !v); }

  async send(text?: string): Promise<void> {
    const msg = (text ?? this.input).trim();
    if (!msg || this.isTyping()) return;
    this.input = '';

    this.messages.update(m => [...m, { role: 'user', text: msg, time: this.now() }]);
    this.isTyping.set(true);

    try {
      const reply = await this.callGemini(msg);
      this.messages.update(m => [...m, { role: 'bot', text: reply, time: this.now() }]);
    } catch {
      // Fallback to local knowledge base when API is unavailable / key not set
      const reply = this.localRespond(msg);
      this.messages.update(m => [...m, { role: 'bot', text: reply, time: this.now() }]);
    } finally {
      this.isTyping.set(false);
    }
  }

  onEnter(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
  }

  // ── Gemini 3.6 Flash — REST API call ─────────────────────────────────────
  private async callGemini(userMsg: string): Promise<string> {
    const key = environment.geminiApiKey;
    if (!key || key === 'YOUR_GEMINI_API_KEY_HERE') {
      throw new Error('No API key configured — falling back to local KB');
    }

    // Append user turn to history
    this.history.push({ role: 'user', parts: [{ text: userMsg }] });

    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`;

    const body = {
      system_instruction: { parts: [{ text: buildSystemPrompt() }] },
      contents: this.history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Gemini error ${res.status}`);

    const json = await res.json();
    const reply: string = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? this.bot.fallback;

    // Append model turn to history for multi-turn context
    this.history.push({ role: 'model', parts: [{ text: reply }] });

    return reply;
  }

  // ── Local keyword fallback (used when API key is absent or API fails) ─────
  private localRespond(msg: string): string {
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
