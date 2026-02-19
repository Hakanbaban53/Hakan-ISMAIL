import { Injectable, signal } from '@angular/core';

export type AppPage = 'home' | 'resume' | 'projects' | 'connect';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  currentPage = signal<AppPage>('home');

  setPage(page: AppPage) {
    this.currentPage.set(page);
    window.scrollTo(0, 0);
  }
}
