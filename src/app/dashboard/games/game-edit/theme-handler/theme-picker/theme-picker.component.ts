import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {merge, Observable, OperatorFunction, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../../game.service';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Theme} from '../../../../../model/theme.model';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css']
})
export class ThemePickerComponent implements OnInit {


  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  @Output()
  backEvent = new EventEmitter<Theme>();

  @Input()
  themes: Theme[] = [];
  @Input()
  gameThemes: Theme[] = [];

  gameIds: number[] = [];
  availableThemes: Theme[];
  availableThemesTitle: string[] = [];

  form: FormGroup;

  constructor(private service: GameService) {
  }

  ngOnInit(): void {
    this.gameThemes.forEach(t => this.gameIds.push(t.id));
    this.availableThemes = this.themes.filter(t => !this.gameIds.includes(t.id));
    this.availableThemes.forEach(t => this.availableThemesTitle.push(t.name));
    this.form = new FormGroup({
      'themeField': new FormControl('', [
          Validators.required,
          this.themeAvailable.bind(this)
        ]
      )
    });
  }

  onSubmit(): void {
    const themeRetrieved = this.retrieveId(this.form.get('themeField').value as string);
    /* this event remove the 'add mode', and triggers the service procedure to attach this theme to current game */
    this.backEvent.emit(themeRetrieved);
  }

  onBack(): void {
    this.form.patchValue({themeField: null});
    this.backEvent.emit(null);
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.availableThemesTitle
        : this.availableThemesTitle.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  };

  private retrieveId(title: string): Theme {
    return this.availableThemes.find(c => c.name === title);
  }

  themeAvailable(control: FormControl): { [s: string]: boolean } {
    return !this.availableThemesTitle.includes(control.value) ? {'notAvailableTheme': true} : null;
  }

}
