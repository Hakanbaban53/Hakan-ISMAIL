import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CacheService } from './cache.service';

export interface DevToArticle {
  title: string;
  url: string;
  published_at: string;
  description: string;
  cover_image: string;
  social_image: string;
  tag_list: string[];
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private http = inject(HttpClient);
  private cache = inject(CacheService);
  private devToUsername = 'hakanbaban53';

  private readonly TTL_MINUTES = 30;

  getLatestArticles(limit: number = 3): Observable<DevToArticle[]> {
    const cacheKey = `devto_articles_${limit}`;
    const cached = this.cache.get<DevToArticle[]>(cacheKey);
    if (cached) return of(cached);

    const url = `https://dev.to/api/articles?username=${this.devToUsername}&per_page=${limit}`;
    return this.http.get<any[]>(url).pipe(
      map((articles) =>
        articles.map((a) => ({
          title: a.title,
          url: a.url,
          published_at: a.published_at,
          description: a.description,
          cover_image: a.cover_image,
          social_image: a.social_image,
          tag_list: a.tag_list,
        })),
      ),
      tap((data) => this.cache.set(cacheKey, data, this.TTL_MINUTES)),
      catchError((error) => {
        console.error('Error fetching Dev.to articles:', error);
        return of([]);
      }),
    );
  }
}
