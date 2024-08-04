import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollNavigationService {

  private currentRouteIndex = 0;
  private routes = ['/home', '/about-me', '/resume', '/projects', '/connect'];

  constructor(private router: Router) { }

  navigateToNextPage() {
    if (this.currentRouteIndex < this.routes.length - 1) {
      this.currentRouteIndex++;
      this.router.navigate([this.routes[this.currentRouteIndex]]).then(() => {
        this.scrollToTop();
      });
    }
  }

  navigateToPreviousPage() {
    if (this.currentRouteIndex > 0) {
      this.currentRouteIndex--;
      this.router.navigate([this.routes[this.currentRouteIndex]]).then(() => {
        this.scrollToBottom();
      });
    }
  }

  navigateToNextHorizontalPage() {
    if (this.currentRouteIndex < this.routes.length - 1) {
      this.currentRouteIndex++;
      this.router.navigate([this.routes[this.currentRouteIndex]]).then(() => {
        this.scrollToTop();
      });
    }
  }

  navigateToPreviousHorizontalPage() {
    if (this.currentRouteIndex > 0) {
      this.currentRouteIndex--;
      this.router.navigate([this.routes[this.currentRouteIndex]]).then(() => {
        this.scrollToBottom();
      });
    }
  }

  updateIndex(route: string) {
    const routeIndex = this.routes.indexOf(route);
    this.currentRouteIndex = routeIndex;
  }

  getIndex(route: string): number {
    return this.routes.indexOf(route);
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }

  private scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }
}
