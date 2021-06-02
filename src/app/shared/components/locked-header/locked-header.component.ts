import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-locked-header',
  templateUrl: './locked-header.component.html',
  styleUrls: ['./locked-header.component.css']
})
export class LockedHeaderComponent implements OnInit {

  @Input()
  entity: string;

  @Input()
  mode: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
