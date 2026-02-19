import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.currentTheme());

    effect(() => {
      const theme = this.currentTheme();
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    });

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.currentTheme() === 'system') {
          this.updateRootClass(document.body, e.matches ? 'dark' : 'light');
        }
      });
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  toggleTheme() {
    const current = this.currentTheme();
    if (current === 'light') this.setTheme('dark');
    else if (current === 'dark') this.setTheme('system');
    else this.setTheme('light');
  }

  private getInitialTheme(): Theme {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        return saved;
      }
    }
    return 'system';
  }

  private applyTheme(theme: Theme) {
    if (typeof document === 'undefined') return;

    const root = document.body;

    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.updateRootClass(root, isDark ? 'dark' : 'light');
    } else {
      this.updateRootClass(root, theme);
    }
  }

  private updateRootClass(root: HTMLElement, theme: 'light' | 'dark') {
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
}
