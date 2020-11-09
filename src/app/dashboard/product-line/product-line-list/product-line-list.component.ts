import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-line-list',
  templateUrl: './product-line-list.component.html',
  styleUrls: ['./product-line-list.component.css']
})
export class ProductLineListComponent implements OnInit {

  lines = [
    {id: 0, name: 'Chtulu'},
    {id: 1, name: 'Warhammer'},
    {id: 2, name: 'Carcassonne'},
    {id: 3, name: 'Clank'},
    {id: 4, name: 'King domino'},
    {id: 5, name: 'Chess'},
    {id: 6, name: 'Captain sonar'},
    {id: 7, name: 'Agricola'},
    {id: 8, name: 'Test'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onDeleteItem(): void {

  }
}
