import {Injectable} from '@angular/core';
import {Account} from '../../model/account.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AccountService} from '../../dashboard-user/members/account.service';
import {Observable} from 'rxjs';
import {GameCopy} from '../../model/game-copy.model';

class Loan {
}

@Injectable({providedIn: 'root'})
export class LoanService {
  apiUri: string;
  copy: GameCopy;
  account: Account;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private accountService: AccountService) {
    this.apiUri = environment.apiUri;
  }


  fetchActiveAccounts(): Observable<Account[]> {
    return this.accountService.fetchActives();
  }

  fetchAvailableCopies(): Observable<GameCopy[]> {
    return this.http.get<GameCopy[]>(this.apiUri + '/admin/game-copies?loan-ready=true');
  }

  create(accountId: number, copyId: number): Observable<Loan> {
    return this.http.post<Loan>(this.apiUri + '/admin/loans?accountId=' + accountId + '&gameCopyId=' + copyId, null);
  }
}
