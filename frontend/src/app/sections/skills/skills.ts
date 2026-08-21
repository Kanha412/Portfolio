import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import skillsData from '../../data/skills.json';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  // ── All skills come from skills.json — edit that file to add/remove skills ──
  readonly groups = skillsData;
}
