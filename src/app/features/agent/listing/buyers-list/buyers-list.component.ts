import { Component, Input } from '@angular/core';
import { Show } from '../../../../core/models/show.model';

@Component({
  selector: 'psh-buyers-list',
  templateUrl: './buyers-list.component.html',
  styleUrls: [ './buyers-list.component.scss' ]
})
export class BuyersListComponent {
  @Input() data: Show[];
}
