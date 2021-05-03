import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-name-handler',
  templateUrl: './name-handler.component.html',
  styleUrls: ['./name-handler.component.css']
})
export class NameHandlerComponent implements OnInit {

  nameForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.nameForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.maxLength(255)])
    });
  }

  onSubmit(): void {
    console.log('submitted !');
  }
}
