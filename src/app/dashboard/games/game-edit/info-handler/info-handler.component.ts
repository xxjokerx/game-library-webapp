import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {GameService} from '../../game.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../../../model/game.model';
import {GameNatureEnum} from '../../../../model/enum/game-nature.enum';

@Component({
  selector: 'app-info-handler',
  templateUrl: './info-handler.component.html',
  styleUrls: ['./info-handler.component.css']
})
export class InfoHandlerComponent implements OnInit {
  form: FormGroup;
  game: Game;
  natureList: Array<string>;
  actualEnumType: typeof GameNatureEnum;

  hasMaxP: boolean;

  hasMaxA: boolean;
  timeUnit: string;
  timeUnitSwitch: string;
  ageInYear: boolean;
  maxAgeFieldControl = '';

  constructor(private service: GameService,
              private route: ActivatedRoute,
              private router: Router) {
    this.natureList = Object.keys(GameNatureEnum);
    this.actualEnumType = GameNatureEnum;


  }

  ngOnInit(): void {
    this.game = this.service.getDetailedGame();
    this.hasMaxP = this.game.maxNumberOfPlayer > 1;
    this.hasMaxA = this.game.maxAge > 1;

    if (this.game.minMonth > 0) {
      this.timeUnit = 'mois';
      this.timeUnitSwitch = 'Âge en années ?';
      this.ageInYear = false;
    } else {
      this.timeUnit = 'ans';
      this.timeUnitSwitch = 'Âge en mois ?';
      this.ageInYear = true;
    }
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      'gameNature': new FormControl(this.game.nature, [Validators.required]),
      'numberOfPlayers': new FormGroup({
        'min': new FormControl(this.game.minNumberOfPlayer, [Validators.min(1), Validators.required]),
        'max': new FormControl(this.game.maxNumberOfPlayer, [Validators.min(0)]),
      }, [this.ageRangeValidator.bind(this)]),
      'duration': new FormControl(this.game.playTime),
      'ageRange': new FormGroup({
        'month': new FormControl(this.game.minMonth),
        'min': new FormControl(this.game.minAge),
        'max': new FormControl(this.game.maxAge)
      }),
    });
  }

  onSubmit(): void {

  }

  onCancel(): void {

  }

  onBack(): void {

  }


  onRemoveMaxP(): void {
    this.hasMaxP = false;
    this.form.patchValue({numberOfPlayers: {max: 0}});
  }

  onAddMaxP(): void {
    this.hasMaxP = true;
  }

  ageRangeValidator: ValidatorFn = (fg: FormGroup) => {
    const min = fg.get('min').value;
    const max = fg.get('max').value;
    return (min > 1 && min <= max) || max === 0
      ? null
      : {ageRangeError: true};
  };

  onRemoveMaxA(): void {
    this.hasMaxA = false;
    this.form.patchValue({ageRange: {max: 0}});
  }

  onAddMaxA(): void {
    this.hasMaxA = true;
  }

  onSwitchToMonth(): void {
    this.ageInYear = false;
    this.timeUnit = 'mois';

    this.form.patchValue({ageRange: {month: this.form.get('ageRange.min').value}});
    this.form.patchValue({ageRange: {min: 0}});
  }

  onSwitchToYear(): void {
    this.ageInYear = true;
    this.timeUnit = 'ans';

    this.form.patchValue({ageRange: {min: this.form.get('ageRange.month').value}});
    this.form.patchValue({ageRange: {month: 0}});
  }

  buildPlayers(min?: number, max?: number): string {
    if (!max) {
      max = 0;
    }
    if (min) {
      return this.service.buildPLayers(min, max);
    }
    return '...';
  }

  buildAge(minAge: number, maxAge: number, minMonth: number): string {
    if (maxAge === 0 || (maxAge > minAge && maxAge * 12 > minMonth)) {
      return this.service.buildAge(minAge, maxAge, minMonth);
    }
    return '...';
  }
}
