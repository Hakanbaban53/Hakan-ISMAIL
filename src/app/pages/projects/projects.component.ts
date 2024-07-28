import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GitService } from '../../services/git.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [
    {
      title: 'RealFire Installer',
      repo: 'Hakanbaban53/RealFire-Installer',
      platform: 'github',
      imagePath: 'assets/Preview_Images/home_page.png',
      technologies: ['Python', 'Shell', 'GitHub Actions']
    },
    {
      title: 'RealFire',
      repo: 'Hakanbaban53/RealFire',
      platform: 'github',
      imagePath: 'assets/preview.png',
      technologies: ['JavaScript', 'CSS']
    },
    {
      title: 'Virtual CANDY',
      repo: 'Hakanbaban53/Virtual-CANDY',
      platform: 'github',
      imagePath: 'assets/terminal_ui.gif',
      technologies: ['OOP', 'Python', 'Shell', 'Github Actions']
    },
    {
      title: 'Intern-001-BurcGer',
      repo: 'Hakanbaban53/Intern-001-BurcGer',
      platform: 'github',
      imagePath: 'assets/preview.png',
      technologies: ['HTML', 'SCSS', 'TypeScript', 'Angular', 'Firebase', 'Ionic']
    },
    {
      title: 'Netger Avukat',
      platform: 'closed',
      imagePath: 'https://netger.net/avukat/logo.svg',
      technologies: ['Special Technology', 'Confidential'],
      description: 'Full-Stack web automation for lawyers',
      link: 'https://netger.net/avukat/'
    }
  ];

  constructor(private gitService: GitService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.projects.forEach((project) => {
      if (project.platform === 'github') {
        this.loadGitHubProject(project);
      } else if (project.platform === 'gitlab') {
        this.loadGitLabProject(project);
      } else if (project.platform === 'closed') {
        this.sanitizeProjectImage(project);
      }
    });
  }

  private loadGitHubProject(project: any) {
    const [username, repo] = project.repo.split('/');
    this.gitService.getGitHubRepoDetails(username, repo).subscribe((data) => {
      project.description = data.description || 'No description available';
      project.link = data.html_url;

      if (project.imagePath) {
        this.gitService
          .getGitHubFileContent(username, repo, project.imagePath)
          .subscribe((fileData) => {
            project.image = fileData.download_url;
          });
      } else {
        project.image = data.owner.avatar_url;
      }
    });
  }

  private loadGitLabProject(project: any) {
    this.gitService.getGitLabRepoDetails(project.repo).subscribe((data) => {
      project.description = data.description || 'No description available';
      project.link = data.web_url;

      if (project.imagePath) {
        this.gitService
          .getGitLabFileContent(project.repo, project.imagePath)
          .subscribe((fileData) => {
            project.image = fileData;
          });
      } else {
        project.image = data.avatar_url;
      }
    });
  }

  private sanitizeProjectImage(project: any) {
    project.image = this.sanitizer.bypassSecurityTrustUrl(project.imagePath);
  }
}
