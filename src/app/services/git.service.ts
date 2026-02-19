import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class GitService {
  private http = inject(HttpClient);
  private cache = inject(CacheService);
  private githubProxy = (environment.githubProxyUrl || '').replace(/\/$/, '');

  private readonly TTL_MINUTES = 60;

  private buildUrl(path: string): string {
    return this.githubProxy
      ? `${this.githubProxy}/api/github${path}`
      : `https://api.github.com${path}`;
  }

  getGitHubRepoDetails = (u: string, r: string) =>
    this.http.get<any>(this.buildUrl(`/repos/${u}/${r}`));

  getGitHubOrgRepos = (o: string) =>
    this.http.get<any[]>(this.buildUrl(`/orgs/${o}/repos?per_page=100`));

  getGitHubOrgDetails(o: string): Observable<any> {
    const cacheKey = `gh_org_${o}`;
    const cached = this.cache.get<any>(cacheKey);
    if (cached) return of(cached);

    return this.http
      .get<any>(this.buildUrl(`/orgs/${o}`))
      .pipe(tap((data) => this.cache.set(cacheKey, data, this.TTL_MINUTES)));
  }

  getGitHubFileContent = (u: string, r: string, p: string) =>
    this.http.get<any>(this.buildUrl(`/repos/${u}/${r}/contents/${p}`));

  getPinnedRepos(
    name: string,
    type: 'user' | 'organization' = 'organization',
  ): Observable<any> {
    const cacheKey = `gh_pinned_${type}_${name}`;
    const cached = this.cache.get<any>(cacheKey);
    if (cached) return of(cached);

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
    return this.graphql(query, { name }).pipe(
      tap((data) => this.cache.set(cacheKey, data, this.TTL_MINUTES)),
    );
  }

  graphql<T>(query: string, variables = {}): Observable<T> {
    const url = this.githubProxy
      ? `${this.githubProxy}/api/github/graphql`
      : 'https://api.github.com/graphql';
    return this.http.post<T>(url, { query, variables });
  }
}
