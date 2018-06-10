import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { AppSettings } from '../settings/app.settings';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  apiUrl = AppSettings.host.apiUrl;
  apiUrlMob = AppSettings.host.apiUrlMob;
  httpOptions = {};
  constructor(private http: HttpClient) {}

  setHttpEscort(paramObj?: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {}
    };

    if (paramObj && Object.keys(paramObj).length) {
      for (const key in paramObj) {
        if (paramObj.hasOwnProperty(key)) {
          this.httpOptions['params'][key] = paramObj[key];
        }
      }
    }
  }

  // GET
  get<T>(url, paramsObj?, api?): Observable<any> {
    this.setHttpEscort(paramsObj);
    const apiUrl = api === 'mobile' ? this.apiUrlMob : this.apiUrl;
    return this.http.get<any>(`${apiUrl}/${url}`, this.httpOptions).pipe(
      map(this.handleResponse),
      catchError(this.handlerError)
    );
  }

  // POST
  post<T>(url, data, paramsObj?, api?): Observable<any> {
    this.setHttpEscort(paramsObj);
    const apiUrl = api === 'mobile' ? this.apiUrlMob : this.apiUrl;
    return this.http
      .post<any>(`${apiUrl}/${url}`, data, this.httpOptions)
      .pipe(
        map(this.handleResponse),
        catchError(this.handlerError)
      );
  }

  handleResponse(response): Observable<any> {
    return response && response['data'];
  }
  handlerError(error: Error): Observable<any> {
    throw(error || 'Server error');
  }
}
