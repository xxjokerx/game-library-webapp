import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-member-new',
  templateUrl: './member-new.component.html',
  styleUrls: ['./member-new.component.css']
})
export class MemberNewComponent implements OnInit, OnDestroy {

  form: FormGroup;
  nameGroupSub: Subscription;

  constructor(private service: AccountService) {
    this.form = new FormGroup({
      'name': new FormGroup({
          'firstname': new FormControl('', [Validators.maxLength(128)]),
          'lastname': new FormControl('', [Validators.maxLength(128)])
        }
      ),
      'email': new FormControl('', [Validators.maxLength(255), Validators.email]),
      'username': new FormControl('', [Validators.maxLength(255), Validators.required])
    });
  }

  ngOnInit(): void {
    this.nameGroupSub = this.form.get('name').valueChanges.subscribe(() => {
      const nameObject = this.form.get('name').value;
      const separator = (nameObject.firstname !== '' && nameObject.lastname !== '') ? '-' : '';
      this.form.get('username').patchValue(nameObject.firstname + separator + nameObject.lastname);
    });
  }

  ngOnDestroy(): void {
    this.nameGroupSub.unsubscribe();
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.service.persistAccount(this.form.value);
  }

  onBack(): void {
    this.service.getAccounts();
  }
}
