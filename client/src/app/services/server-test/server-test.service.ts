import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerTestData } from './server-test.model';
import { tap } from 'rxjs/operators';

// shared from backend
import { routes } from '../../../../../server/src/app/routes';

@Injectable({
  providedIn: 'root'
})
export class ServerTestService {

  constructor(private http: HttpClient) { }

  public getServerTestData$(): Observable<ServerTestData[]> {

    console.log('**** service getServerTestData()');
    return this.http.get<ServerTestData[]>(routes.api._root + routes.api.test);
  }

}
