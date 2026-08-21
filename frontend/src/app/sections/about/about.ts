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
}
