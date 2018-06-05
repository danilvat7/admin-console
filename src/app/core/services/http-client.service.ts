import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  api = 'http://stagingmls.primeshowing.com';
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
  get<T>(url, paramsObj?): Observable<any> {
    this.setHttpEscort(paramsObj);
    return this.http
      .get<any>(`${this.api}/${url}`, this.httpOptions)
      .pipe(map(this.handleResponse), catchError(this.handlerError));
  }

  handleResponse(response): Observable<any> {
    return response.data;
  }
  handlerError(error: Error): Observable<any> {
    return of(error || 'Server error');
  }
}
