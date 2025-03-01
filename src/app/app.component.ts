import { Component, HostListener, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { filter, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ScrollNavigationService } from './services/scroll-navigation.service';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  theme$: Observable<string>;
  darkFavicon = 'favicon_dark.svg';
  lightFavicon = 'favicon_light.svg';

  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchEndX: number = 0;
  private touchEndY: number = 0;

  private readonly SWIPE_THRESHOLD: number = 50;
  private readonly SCROLL_THRESHOLD: number = 50;
  PROGRESS_THRESHOLD = 100;

  progress = 0;
  title = 'Hakanbaban53';
  currentPage: string = '/home';
  isScrollingEnabled: boolean = true;
  isSwipeEnabled: boolean = true;

  constructor(
    private router: Router,
    protected route: ActivatedRoute,
    private scrollNavigationService: ScrollNavigationService,
    private themeService: ThemeService
  ) {
    this.theme$ = this.themeService.theme$;
  }

  ngOnInit() {
    this.setCurrentYear();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.scrollNavigationService.updateIndex(event.urlAfterRedirects);
        this.progress = 0; // Reset progress on navigation
      });
  }

  setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = `${currentYear}`;
    }
  }

  updateIndexCopy(route: string) {
    this.scrollNavigationService.updateIndex(route);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  closeNavbar() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const customContextMenu = document.getElementById('custom-context-menu');
    if (customContextMenu) {
      customContextMenu.classList.remove('show');
    }

    const clickedInsideNavbar = (event.target as HTMLElement).closest('.navbar-collapse');
    if (!clickedInsideNavbar) {
      this.closeNavbar();
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    const customContextMenu = document.getElementById('custom-context-menu');
    if (customContextMenu) {
      customContextMenu.style.top = `${event.clientY}px`;
      customContextMenu.style.left = `${event.clientX}px`;
      customContextMenu.classList.add('show');
    }
    return false;
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isScrollingEnabled && !this.isEventInScrollableElement(event)) {
      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const atBottom = scrollPosition >= documentHeight - this.SCROLL_THRESHOLD;
      const atTop = window.scrollY <= this.SCROLL_THRESHOLD;

      if (delta > 0 && atBottom) {
        this.progress += 25; // Increment progress for scroll down
        if (this.progress >= this.PROGRESS_THRESHOLD) {
          this.scrollNavigationService.navigateToNextPage();
          this.progress = 0; // Reset progress after navigation
        }
      } else if (delta < 0 && atTop) {
        this.progress -= 25; // Decrement progress for scroll up
        if (this.progress <= -this.PROGRESS_THRESHOLD) {
          this.scrollNavigationService.navigateToPreviousPage();
          this.progress = 0; // Reset progress after navigation
        } else if (this.progress > 0) {
          this.progress = 0; // Prevent progress from going negative
        }
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const isInputField =
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable;

    if (isInputField) {
      return; // Prevent navigation if focus is on a writable element
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      this.scrollNavigationService.navigateToNextPage();
      this.progress = 0; // Reset progress after navigation
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      this.scrollNavigationService.navigateToPreviousPage();
      this.progress = 0; // Reset progress after navigation
    }
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    if (this.isSwipeEnabled && !this.isEventInScrollableElement(event)) {
      this.handleSwipeGesture();
    }
  }

  handleSwipeGesture() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > this.SWIPE_THRESHOLD) {
        if (deltaX > 0) {
          this.scrollNavigationService.navigateToPreviousHorizontalPage();
        } else {
          this.scrollNavigationService.navigateToNextHorizontalPage();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > this.SWIPE_THRESHOLD) {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const atBottom =
          scrollPosition >= documentHeight - this.SCROLL_THRESHOLD;
        const atTop = window.scrollY <= this.SCROLL_THRESHOLD;

        if (deltaY < 0 && atBottom) {
          // Swipe up
          this.progress += 50;
          if (this.progress >= this.PROGRESS_THRESHOLD) {
            this.scrollNavigationService.navigateToNextPage();
            this.progress = 0; // Reset progress after navigation
          }
        } else if (deltaY > 0 && atTop) {
          // Swipe down
          this.progress -= 50;
          if (this.progress <= -this.PROGRESS_THRESHOLD) {
            this.scrollNavigationService.navigateToPreviousPage();
            this.progress = 0; // Reset progress after navigation
          } else if (this.progress > 0) {
            this.progress = 0; // Prevent progress from going negative
          }
        }
      }
    }
  }

  private isEventInScrollableElement(event: Event): boolean {
    let target = event.target as HTMLElement | null;

    while (target) {
      const overflow = window.getComputedStyle(target).overflow;
      if (overflow === 'auto' || overflow === 'scroll') {
        return true;
      }
      target = target.parentElement; // No type assertion needed here
    }

    return false;
  }
}
