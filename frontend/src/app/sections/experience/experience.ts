import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import experienceData from '../../data/experience.json';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent {
  // ── All jobs come from experience.json — most recent job should be first in the array ──
  readonly jobs = experienceData;
}
