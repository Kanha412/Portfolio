import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import educationData from '../../data/education.json';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class EducationComponent {
  // ── All education data comes from education.json ──
  readonly entries = educationData.entries;
}
