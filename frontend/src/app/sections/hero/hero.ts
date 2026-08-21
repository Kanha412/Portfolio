import { Component, OnDestroy, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import gsap from 'gsap';
import heroData from '../../data/hero.json';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  // ── Data from JSON ───────────────────────────────────────
  readonly data = heroData;
  displayText = signal('');

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private mesh!: THREE.Mesh;
  private particles!: THREE.Points;
  private rafId!: number;
  private mouseX = 0;
  private mouseY = 0;
  private titleIndex = 0;

  ngAfterViewInit(): void {
    this.initThree();
    this.startTypewriter();
    this.bindMouse();
    this.animateEntrance();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.renderer?.dispose();
    window.removeEventListener('mousemove', this.onMouse);
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    this.camera.position.z = 4;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geo = new THREE.IcosahedronGeometry(1.3, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0x6c63ff, wireframe: true, transparent: true, opacity: 0.6 });
    this.mesh = new THREE.Mesh(geo, mat);
    this.scene.add(this.mesh);

    const solidGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const solidMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0f, transparent: true, opacity: 0.9 });
    this.scene.add(new THREE.Mesh(solidGeo, solidMat));

    const pCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) positions[i] = (Math.random() - 0.5) * 10;
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.03, transparent: true, opacity: 0.6 });
    this.particles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.particles);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const point1  = new THREE.PointLight(0x6c63ff, 4, 10);
    point1.position.set(3, 3, 3);
    const point2  = new THREE.PointLight(0x00d4ff, 3, 10);
    point2.position.set(-3, -2, 2);
    this.scene.add(ambient, point1, point2);

    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  private animate(): void {
    this.rafId = requestAnimationFrame(() => this.animate());
    const t = Date.now() * 0.001;
    this.mesh.rotation.x = t * 0.15 + this.mouseY * 0.3;
    this.mesh.rotation.y = t * 0.2  + this.mouseX * 0.3;
    this.particles.rotation.y = t * 0.02;
    this.renderer.render(this.scene, this.camera);
  }

  private onMouse = (e: MouseEvent) => {
    this.mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  private bindMouse(): void { window.addEventListener('mousemove', this.onMouse); }

  private onResize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }

  private startTypewriter(): void {
    const titles = this.data.titles;
    const cycle = () => {
      const title = titles[this.titleIndex % titles.length];
      let i = 0;
      this.displayText.set('');
      const typeInt = setInterval(() => {
        this.displayText.set(title.slice(0, ++i));
        if (i === title.length) {
          clearInterval(typeInt);
          setTimeout(() => {
            let j = title.length;
            const delInt = setInterval(() => {
              this.displayText.set(title.slice(0, --j));
              if (j === 0) { clearInterval(delInt); this.titleIndex++; setTimeout(cycle, 400); }
            }, 60);
          }, 1800);
        }
      }, 80);
    };
    cycle();
  }

  private animateEntrance(): void {
    gsap.fromTo('.hero-tag',    { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3 });
    gsap.fromTo('.hero-name',   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.hero-sub',    { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' });
    gsap.fromTo('.hero-desc',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power3.out' });
    gsap.fromTo('.hero-btns',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: 'power3.out' });
    gsap.fromTo('.hero-canvas', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, delay: 0.4, ease: 'power3.out' });
  }

  scrollTo(id: string): void {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
