import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitService {
  private githubBaseUrl = 'https://api.github.com/repos/';
  private gitlabBaseUrl = 'https://gitlab.com/api/v4/projects/';

  constructor(private http: HttpClient) {}

  // Method to get GitHub repository details
  getGitHubRepoDetails(username: string, repo: string): Observable<any> {
    return this.http.get<any>(`${this.githubBaseUrl}${username}/${repo}`);
  }

  // Method to get GitHub raw content of a file from the repository
  getGitHubFileContent(username: string, repo: string, path: string): Observable<any> {
    return this.http.get<any>(`${this.githubBaseUrl}${username}/${repo}/contents/${path}`);
  }

  // Method to get GitLab repository details
  getGitLabRepoDetails(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.gitlabBaseUrl}${projectId}`);
  }

  // Method to get GitLab raw content of a file from the repository
  getGitLabFileContent(projectId: string, path: string): Observable<any> {
    return this.http.get<any>(`${this.gitlabBaseUrl}${projectId}/repository/files/${encodeURIComponent(path)}/raw`);
  }
}
