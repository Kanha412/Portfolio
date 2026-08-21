import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import achievementsData from '../../data/achievements.json';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss',
})
export class AchievementsComponent {
  // ── All achievements come from achievements.json ──
  readonly items = achievementsData;
}
