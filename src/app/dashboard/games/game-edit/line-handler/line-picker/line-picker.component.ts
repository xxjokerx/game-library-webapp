import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {merge, Observable, OperatorFunction, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductLine} from '../../../../../model/product-line.model';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Category} from '../../../../../model/category.model';

@Component({
  selector: 'app-line-picker',
  templateUrl: './line-picker.component.html',
  styleUrls: ['./line-picker.component.css']
})
export class LinePickerComponent implements OnInit {

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  @Output()
  backEvent = new EventEmitter<ProductLine>();

  @Input()
  allProductLines: ProductLine[];

  availableProductLines: ProductLine[] = [];
  availableProductLinesTitle: string[];

  @Input()
  currentGameProductLine: ProductLine;

  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.availableProductLines = this.allProductLines.filter(pl => pl !== this.currentGameProductLine);
    this.availableProductLinesTitle = this.availableProductLines.map(({name}) => name);
    console.table(this.availableProductLinesTitle);
    this.form = new FormGroup({
      'productLineField': new FormControl('', [
        Validators.required,
        this.productLineAvailable.bind(this)
      ])
    });
  }

  onSubmit(): void {
    const retrievedProductLine = this.retrieveProductLine(this.form.get('productLineField').value as string);
    /* this event remove the 'add mode', and triggers the service procedure to attach this category to current game */
    this.backEvent.emit(retrievedProductLine);
  }

  onBack(): void {
    this.form.patchValue({productLineField: null});
    this.backEvent.emit(null);
  }


  private retrieveProductLine(title: string): Category {
    return this.availableProductLines.find(c => c.name === title);
  }

  productLineAvailable(control: FormControl): { [s: string]: boolean } {
    return !this.availableProductLinesTitle.includes(control.value) ? {'notAvailableProductLine': true} : null;
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.availableProductLinesTitle
        : this.availableProductLinesTitle.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  };

}
