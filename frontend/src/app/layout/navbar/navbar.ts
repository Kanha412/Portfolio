import { Component, OnInit, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink { label: string; href: string; }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent implements OnInit {
  scrolled = signal(false);
  menuOpen = signal(false);

  links: NavLink[] = [
    { label: 'About',        href: '#about' },
    { label: 'Education',    href: '#education' },
    { label: 'Skills',       href: '#skills' },
    { label: 'Experience',   href: '#experience' },
    { label: 'Projects',     href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact',      href: '#contact' },
  ];

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  navigate(href: string): void {
    this.menuOpen.set(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }
}
