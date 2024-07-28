import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeClass = 'dark-theme';
  private lightThemeClass = 'light-theme';
  private themeSubject = new BehaviorSubject<string>(this.detectSystemTheme());

  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
  }

  toggleTheme() {
    const currentTheme = this.themeSubject.value;
    if (currentTheme === this.darkThemeClass) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  private setDarkTheme() {
    document.body.classList.add(this.darkThemeClass);
    document.body.classList.remove(this.lightThemeClass);
    this.themeSubject.next(this.darkThemeClass);
  }

  private setLightTheme() {
    document.body.classList.add(this.lightThemeClass);
    document.body.classList.remove(this.darkThemeClass);
    this.themeSubject.next(this.lightThemeClass);
  }

  private detectSystemTheme(): string {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? this.darkThemeClass : this.lightThemeClass;
  }

  private applyTheme(theme: string) {
    if (theme === this.darkThemeClass) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }
}
