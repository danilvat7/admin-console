import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClientService } from './http-client.service';


@Injectable({
    providedIn: 'root'
  })
export class ApiUrlGuard implements CanActivate {
    currentMls: any;
    constructor(private router: Router, private http: HttpClientService) {
        this.currentMls = JSON.parse(localStorage.getItem('currentMls'));
    }

    canActivate(): boolean {
        if (this.http.apiUrl) {
            return true;
        } else {
            this.router.navigate(['/mls']);
        }
      }
}
