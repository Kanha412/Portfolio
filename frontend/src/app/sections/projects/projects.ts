import { Component, signal, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import VanillaTilt from 'vanilla-tilt';
import allProjects from '../../data/projects.json';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('tiltCard') tiltCards!: QueryList<ElementRef<HTMLElement>>;

  activeFilter = signal('All');
  filters = ['All', 'Web', 'AI', 'ML'];

  // ── All projects from projects.json (newest first in that file) ──
  // Filter out JSON comment-only entries (_note field only)
  readonly projects = (allProjects as any[]).filter(p => p.title);

  get filtered() {
    const f = this.activeFilter();
    return f === 'All' ? this.projects : this.projects.filter((p: any) => p.category === f);
  }

  setFilter(f: string): void {
    this.activeFilter.set(f);
    setTimeout(() => this.initTilt(), 100);
  }

  ngAfterViewInit(): void {
    this.initTilt();
    this.tiltCards.changes.subscribe(() => this.initTilt());
  }

  private initTilt(): void {
    this.tiltCards?.forEach(ref => {
      VanillaTilt.init(ref.nativeElement, {
        max: 8, speed: 400, glare: true, 'max-glare': 0.15, perspective: 1000,
      });
    });
  }
}
