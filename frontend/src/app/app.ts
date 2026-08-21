import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/footer';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { SkillsComponent } from './sections/skills/skills';
import { ExperienceComponent } from './sections/experience/experience';
import { ProjectsComponent } from './sections/projects/projects';
import { ChatbotComponent } from './sections/chatbot/chatbot';
import { ContactComponent } from './sections/contact/contact';
import { EducationComponent } from './sections/education/education';
import { AchievementsComponent } from './sections/achievements/achievements';
import Lenis from 'lenis';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ChatbotComponent,
    ContactComponent,
    EducationComponent,
    AchievementsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private lenis!: Lenis;

  ngOnInit(): void {
    // Smooth scroll
    this.lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => { this.lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // AOS
    AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });
  }

  ngOnDestroy(): void {
    this.lenis?.destroy();
  }
}
