import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Injectable} from '@angular/core';
import {GameService} from '../../dashboard/games/game.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UniqueTitleValidator implements AsyncValidator {
  takenNames: string[];
  isTaken: boolean;

  constructor(private gameService: GameService) {
    this.takenNames = null;
    this.isTaken = true;
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (!this.takenNames) {
      this.gameService.fetchNames().pipe(
        map(names => this.takenNames = names)
      ).subscribe(() => this.isTaken = this.takenNames.includes(control.value.toLowerCase().trim()));
    } else {
      this.isTaken = this.takenNames.includes(control.value.toLowerCase().trim());
    }
    return of(this.isTaken ? {uniqueTitle: true} : null);
  }
}
