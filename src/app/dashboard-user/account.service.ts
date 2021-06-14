import {Injectable} from '@angular/core';
import {accountFormValueModel} from '../model/account-form-value.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Account} from '../model/account.model';

@Injectable({providedIn: 'root'})
export class AccountService {
  apiUri: string;

  constructor(private router: Router,
              private http: HttpClient) {
    this.apiUri = environment.apiUri;
  }

  persistAccount(formValue: accountFormValueModel): void {
    const account = new Account(formValue);
    let contactParam = '';
    if (account.contact) {
      contactParam = '?has-contact=true';
    }
    this.http.post<Account>(this.apiUri + '/admin/accounts' + contactParam, account).subscribe();
  }

  getAccounts(): void {
    this.http.get<any>(this.apiUri + '/admin/accounts').subscribe(accounts => console.log(accounts));
  }
}
