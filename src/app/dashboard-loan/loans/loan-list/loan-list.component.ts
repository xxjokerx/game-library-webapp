import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Loan} from '../../../model/loan.model';
import {LoanService} from '../loan.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  loans$: Observable<Loan[]>;

  constructor(private service: LoanService) {
  }

  ngOnInit(): void {
    this.loans$ = this.service.fetchAll();
  }

  onNavigateToDetail(id: number): void {
  }

}
