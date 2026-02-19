import { Component, HostListener, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { NavigationService, AppPage } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ThemeToggle,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  navigationService = inject(NavigationService);

  isScrolled = false;
  isMobileMenuOpen = false;

  navLinks: { label: string; page: AppPage }[] = [
    { label: 'Resume', page: 'resume' },
    { label: 'Projects', page: 'projects' },
    { label: 'Connect', page: 'connect' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  setPage(page: AppPage) {
    this.navigationService.setPage(page);
    this.closeMobileMenu();
  }
}
