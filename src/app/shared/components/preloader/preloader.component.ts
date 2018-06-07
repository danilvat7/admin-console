import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  @Input() loading: boolean;
  @Input()
  set position(value: string) {
    if (value) {
      this._position = value;
    }
  }
  @Input()
  set bg(value: string) {
    if (value) {
      this._bg = value;
    }
  }
  _position = 'fixed';
  _bg = 'rgba(0, 0, 0, 0.1)';
  constructor() {}

  ngOnInit() {}
}
