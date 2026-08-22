import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import aboutData from '../../data/about.json';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  // ── All text comes from about.json — edit that file, not this one ──
  readonly data = aboutData;

  // Set to true once the avatar image loads; false = show KG initials fallback
  avatarLoaded = false;
  // Path relative to the public/ folder — drop avatar.jpg there and it works
  readonly avatarSrc = 'avatar.png';

  onAvatarLoad():  void { this.avatarLoaded = true; }
  onAvatarError(): void { this.avatarLoaded = false; }
}
