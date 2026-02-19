import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from './services/navigation.service';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { HomeComponent } from './pages/home/home.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ConnectComponent } from './pages/connect/connect.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Navbar } from './components/navbar/navbar';
import { DebugService } from './services/debug.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatIconModule,
    HomeComponent,
    ResumeComponent,
    ProjectsComponent,
    ConnectComponent,
    Navbar,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Hakanbaban53';

  navigationService = inject(NavigationService);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  private debugService = inject(DebugService);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'hakan-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('hakan-logo.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('linkedin.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'devto',
      this.domSanitizer.bypassSecurityTrustResourceUrl('devto.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('instagram.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('github.svg'),
    );
  }

  ngOnInit() {
    // Debug service is initialized to handle global context menu.
    console.log('Project instance initialized with debug support.');
  }
}
