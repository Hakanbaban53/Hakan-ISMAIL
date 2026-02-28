import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GitService {
  private http = inject(HttpClient);
  private cache = new Map<string, Observable<any>>();
  private githubProxy = (environment.githubProxyUrl || '').replace(/\/$/, '');

  private buildUrl(path: string): string {
    return this.githubProxy
      ? `${this.githubProxy}/api/github${path}`
      : `https://api.github.com${path}`;
  }

  get<T>(path: string, forceRefresh = false): Observable<T> {
    if (forceRefresh) {
      this.cache.delete(path);
    }

    if (!this.cache.has(path)) {
      const url = this.buildUrl(path);
      const request$ = this.http.get<T>(url).pipe(shareReplay(1));
      this.cache.set(path, request$);
    }

    return this.cache.get(path)! as Observable<T>;
  }

  getGitHubRepoDetails = (u: string, r: string) =>
    this.get<any>(`/repos/${u}/${r}`);

  getGitHubOrgRepos = (o: string) =>
    this.get<any[]>(`/orgs/${o}/repos?per_page=100`);

  getGitHubOrgDetails = (o: string) => this.get<any>(`/orgs/${o}`);

  getGitHubFileContent = (u: string, r: string, p: string) =>
    this.get<any>(`/repos/${u}/${r}/contents/${p}`);

  getPinnedRepos(
    name: string,
    type: 'user' | 'organization' = 'organization',
    forceRefresh = false,
  ): Observable<any> {
    const cacheKey = `graphql_pinned_${type}_${name}`;
    if (forceRefresh) {
      this.cache.delete(cacheKey);
    }

    if (!this.cache.has(cacheKey)) {
      const query = `query($name: String!) {
        ${type}(login: $name) {
          pinnedItems(first: 10, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name description stargazerCount
                primaryLanguage { name }
                url openGraphImageUrl homepageUrl
              }
            }
          }
        }
      }`;
      const request$ = this.graphql<any>(query, { name }).pipe(shareReplay(1));
      this.cache.set(cacheKey, request$);
    }

    return this.cache.get(cacheKey)! as Observable<any>;
  }

  graphql<T>(query: string, variables = {}): Observable<T> {
    const url = this.githubProxy
      ? `${this.githubProxy}/api/github/graphql`
      : 'https://api.github.com/graphql';
    return this.http.post<T>(url, { query, variables });
  }
}
