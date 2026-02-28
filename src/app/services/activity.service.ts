import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, shareReplay } from 'rxjs';

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
  private cache = new Map<number, Observable<DevToArticle[]>>();
  private devToUsername = 'hakanbaban53';

  getLatestArticles(
    limit: number = 3,
    forceRefresh = false,
  ): Observable<DevToArticle[]> {
    if (forceRefresh) {
      this.cache.delete(limit);
    }

    if (!this.cache.has(limit)) {
      const url = `https://dev.to/api/articles?username=${this.devToUsername}&per_page=${limit}`;
      const request$ = this.http.get<any[]>(url).pipe(
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
        shareReplay(1),
        catchError((error) => {
          console.error('Error fetching Dev.to articles:', error);
          this.cache.delete(limit); // Don't cache errors
          throw error;
        }),
      );
      this.cache.set(limit, request$);
    }

    return this.cache.get(limit)!;
  }
}
