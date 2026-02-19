import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { GitService } from '../../services/git.service';
import { SafeUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';

interface Project {
  title: string;
  repo?: string;
  platform: 'github' | 'closed';
  image?: string | SafeUrl;
  technologies: string[];
  description?: string;
  repoUrl?: string;
  siteUrl?: string | null;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  private gitService = inject(GitService);

  isLoading = true;
  zarestiaOrg = {
    name: 'Zarestia',
    logo: 'https://github.com/Zarestia-Dev.png',
    description: 'Building intuitive, cross-platform apps.',
    githubUrl: 'https://github.com/Zarestia-Dev',
  };

  personalInfo = {
    name: 'Hakan İSMAİL',
    logo: 'hakan-logo',
    description: 'System Administrator & DevOps Engineer.',
    githubUrl: 'https://github.com/Hakanbaban53',
  };

  personalProjects: Project[] = [];
  zarestiaProjects: Project[] = [];

  ngOnInit() {
    this.loadAllProjects();
  }

  private loadAllProjects() {
    this.isLoading = true;
    forkJoin({
      zarestiaOrg: this.gitService.getGitHubOrgDetails('Zarestia-Dev'),
      zarestiaPinned: this.gitService.getPinnedRepos('Zarestia-Dev'),
      personalPinned: this.gitService.getPinnedRepos('Hakanbaban53', 'user'),
    }).subscribe({
      next: (res) => {
        // Map Zarestia Org Details
        this.zarestiaOrg = {
          name: res.zarestiaOrg.name,
          logo: res.zarestiaOrg.avatar_url,
          description: res.zarestiaOrg.description,
          githubUrl: res.zarestiaOrg.html_url,
        };

        // Map Zarestia Projects
        this.zarestiaProjects = (
          res.zarestiaPinned?.data?.organization?.pinnedItems?.nodes || []
        ).map((repo: any) => this.mapRepoToProject(repo));

        // Map Personal Projects
        this.personalProjects = (
          res.personalPinned?.data?.user?.pinnedItems?.nodes || []
        ).map((repo: any) => this.mapRepoToProject(repo));

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.isLoading = false;
      },
    });
  }

  private mapRepoToProject(repo: any): Project {
    return {
      title: repo.name,
      repo: repo.url.split('github.com/')[1],
      platform: 'github' as const,
      description: repo.description,
      repoUrl: repo.url,
      siteUrl: repo.homepageUrl || null,
      technologies: [repo.primaryLanguage?.name].filter((l) => l),
      isFeatured: true,
      image: repo.openGraphImageUrl,
    };
  }
}
