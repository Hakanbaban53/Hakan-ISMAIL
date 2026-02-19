import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivityService, DevToArticle } from '../../services/activity.service';

@Component({
  selector: 'app-connect',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss',
})
export class ConnectComponent implements OnInit {
  private activityService = inject(ActivityService);

  isLoadingActivity = true;
  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hakan-ismail-b632181a6/',
      icon: 'linkedin',
      color: '#0077b5',
    },
    {
      name: 'Dev.to',
      url: 'https://dev.to/hakanbaban53',
      icon: 'devto',
      color: '#000000',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/hakanbaban53/',
      icon: 'instagram',
      color: '#e4405f',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Hakanbaban53',
      icon: 'github',
      color: '#333',
    },
  ];

  feedItems: any[] = [];

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.isLoadingActivity = true;
    this.activityService.getLatestArticles(2).subscribe({
      next: (articles: DevToArticle[]) => {
        const devToItems = articles.map((a) => ({
          platform: 'Dev.to',
          title: a.title,
          content: a.description,
          url: a.url,
          date: new Date(a.published_at).toLocaleDateString(),
          icon: 'article',
          image: a.social_image || a.cover_image,
        }));

        this.feedItems = devToItems;
        this.isLoadingActivity = false;
      },
      error: () => {
        this.isLoadingActivity = false;
        // Fallback or just empty
      },
    });
  }

  sendEmail() {
    window.location.href = 'mailto:hakanismail53@gmail.com';
  }
}
