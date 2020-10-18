import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerTestData } from './server-test.model';
import { tap } from 'rxjs/operators';

// shared from backend
import { routes } from '../../../../../server/src/app/routes';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ServerTestService {

  constructor(private http: HttpClient, private loggerService: LoggerService) {
    this.loggerService.enableLogger(true);
   }

  public getServerTestData$(): Observable<ServerTestData[]> {

    this.loggerService.log('**** service getServerTestData()');
    return this.http.get<ServerTestData[]>(routes.api._root + routes.api.test);
  }

}
