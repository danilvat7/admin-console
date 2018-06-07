import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

interface Mls {
  id: string;
  path: string;
}

@Component({
  selector: 'psh-select-mls',
  templateUrl: './select-mls.component.html'
})
export class SelectMlsComponent implements OnInit {
  mlss: SelectItem[];
  selectedMLS: Mls = {
    id: 'STAGING',
    path: 'http://stagingmls.primeshowing.com/'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // доступ к базе 54.156.238.74  primeshowing/Showing2017!
    // stagingmls.primeshowing.com
    // TODO ничего там не менять
    this.mlss = [
      {
        label: 'STAGING',
        value: {
          id: 'STAGING',
          path: 'http://stagingmls.primeshowing.com/'
        }
      }
      // {
      //   label: 'Mobile MLS',
      //   value: {
      //     id: '1',
      //     path: 'http://stagingmob.primeshowing.com/'
      //   }
      // }
    ];
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url  = this.router.url;
        if (url === '/mls') {
          console.log(url);
          this.selectedMLS = null;
        // this.onMLSselect();
        }
      }
    });

    this.onMLSselect();
  }

  // private getActiveMls() {
  //   const mlsId =
  //     this.route.firstChild && this.route.firstChild.snapshot.params['mlsId'];
  //   const index = this.mlss.findIndex(
  //     el => el.value.id.toLowerCase() === mlsId
  //   );
  //   if (index > -1) {
  //     this.selectedMLS = this.mlss[index].value;
  //   }
  // }

  onMLSselect() {
    this.router.navigate([
      `/mls/${this.selectedMLS['id'].toLowerCase()}/agents`
    ]);
  }
}
