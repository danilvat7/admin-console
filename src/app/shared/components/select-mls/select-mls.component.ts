import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../../../core/settings/app.settings';
import { HttpClientService } from '../../../core/services/http-client.service';

interface Mls {
  id: string;
  path: string;
}

@Component({
  selector: 'psh-select-mls',
  templateUrl: './select-mls.component.html'
})
export class SelectMlsComponent implements OnInit {
  mlsUrls = AppSettings.host.apiUrls;
  selectedMLS: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClientService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        if (url === '/mls') {
          this.selectedMLS = null;
        }
      }
    });
    if (localStorage.getItem('currentMls')) {
      const { id } = JSON.parse(localStorage.getItem('currentMls'));
      this.router.navigate([`/mls/${id.toLowerCase()}/agents`]);
    }
  }
  onMLSselect() {
    localStorage.setItem('currentMls', JSON.stringify(this.selectedMLS));
    this.http.apiUrl = this.selectedMLS.url;

    this.router.navigate([
      `/mls/${this.selectedMLS['id'].toLowerCase()}/agents`
    ]);
  }
}
