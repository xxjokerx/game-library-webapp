import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../../../../model/category.model';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {merge, Observable, OperatorFunction, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.css']
})
export class CategoryPickerComponent implements OnInit {

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  @Input()
  categories: Category[] = [];

  @Input()
  gameCategories: Category[] = [];
  gameIds: number[] = [];
  availableCategories: Category[];
  availableCategoriesTitle: string[] = [];

  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.gameCategories.forEach(category => this.gameIds.push(category.id));
    this.availableCategories = this.categories.filter(category => !this.gameIds.includes(category.id));
    this.availableCategories.forEach(category => this.availableCategoriesTitle.push(category.name));
    this.form = new FormGroup({
      'categoryField': new FormControl('', [
          Validators.required,
          this.categoryAvailable.bind(this)
        ]
      )
    });
  }

  onSubmit(): void {
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.availableCategoriesTitle
        : this.availableCategoriesTitle.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  };

  categoryAvailable(control: FormControl): { [s: string]: boolean } {
    return !this.availableCategoriesTitle.includes(control.value) ? {'notAvailableCategory': true} : null;
  }
}
