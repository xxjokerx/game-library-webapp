import {Component, OnInit} from '@angular/core';
import {LoanService} from '../loan.service';
import {Account} from '../../../model/account.model';
import {GameCopy} from '../../../model/game-copy.model';

@Component({
  selector: 'app-confirm-loan',
  templateUrl: './confirm-loan.component.html',
  styleUrls: ['./confirm-loan.component.css']
})
export class ConfirmLoanComponent implements OnInit {

  account: Account;
  copy: GameCopy;

  constructor(private service: LoanService) {
  }

  ngOnInit(): void {
    this.copy = this.service.copy;
    this.account = this.service.account;
  }

  onConfirm(): void {
    this.service.create(this.account.id, this.copy.id).subscribe(l => console.log(l));
  }
}
