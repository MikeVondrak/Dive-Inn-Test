import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, ReplaySubject, of } from 'rxjs';

import { GoogleFontsApi, GoogleFontsApiSort, GoogleFontsApiResponse} from './google-fonts-api.model';
import { shareReplay, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleFontsApiService {

  private readonly BASE_URL: string = 'https://www.googleapis.com/webfonts/v1/webfonts';
  private readonly API_KEY: string = '?key=AIzaSyCqZ3dPYustmQUajzIhYu7MJeJ_ePHPnyk';
  private readonly SORT_PARAM: string = '&sort=';
  private readonly URL = this.BASE_URL + this.API_KEY + this.SORT_PARAM;
  private readonly CACHE_SIZE: 1;

  /**
   * map of sharedReplay Observables to store caches of different sort methods
   */
  private cacheMap = new Map <GoogleFontsApiSort, Observable<GoogleFontsApi[]>>();

  /**
   * @param http HttpClient for API requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets an array of fonts from the Google Fonts API, optionally sorted
   * @param sort [='popularity'] sort type option
   * @param clearCache [=false] boolean to force API request
   * @returns Observable of fonts array
   */
  public getFonts$(sort: GoogleFontsApiSort = 'popularity', clearCache: boolean = false): Observable<GoogleFontsApi[]> {
    //console.time('getFonts$');

    const url = this.URL + sort;
    return this.getGoogleFontsData$(sort, url, clearCache);
  }

  /**
   * Returns font data for the provided sort key, populating if necessary with a GET request to the provided URL
   * @param sortKey Key for cache map
   * @param url URL for API request
   * @param clearCache [=false] boolean to force API request for new data
   * @returns Observable of Google Fonts array
   */
  private getGoogleFontsData$(sortKey: GoogleFontsApiSort, url: string, clearCache: boolean = false): Observable<GoogleFontsApi[]> {
    let cache$ = this.cacheMap.get(sortKey);
    if (!cache$ || clearCache) {
      //console.log('!!!!! GoogleFontsApiService.getGoogleFontsData$ making HTTP request !!!!!');
      //console.time('Google Fonts Request');
      cache$ = this.http
        .get<GoogleFontsApiResponse>(url)
        .pipe(
          pluck('items'),
          // enable 'multicast' style of notification for better performance (if we had multiple subscribers),
          // and provide last value to each new subscriber
          shareReplay(this.CACHE_SIZE),
        );
      this.cacheMap.set(sortKey, cache$);
      //console.timeEnd('Google Fonts Request');
    }
    return cache$;
  }
}
