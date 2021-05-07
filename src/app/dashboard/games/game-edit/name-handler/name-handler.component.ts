import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../game.service';
import {Game} from '../../../../model/game.model';
import {UniqueTitleValidator} from '../../../../shared/validators/unique-title-validator.service';

@Component({
  selector: 'app-name-handler',
  templateUrl: './name-handler.component.html',
  styleUrls: ['./name-handler.component.css']
})
export class NameHandlerComponent implements OnInit, OnDestroy {

  form: FormGroup;
  game: Game;

  constructor(private service: GameService,
              private takenNameValidator: UniqueTitleValidator) {
  }

  ngOnInit(): void {
    this.game = this.service.getDetailedGame();
    this.initForm();
  }

  ngOnDestroy(): void {
    console.log('reset validators memory');
    this.takenNameValidator.resetMemory();
  }

  private initForm(): void {
    this.form = new FormGroup({
      'name': new FormControl(this.game.name, [
          Validators.required,
          Validators.maxLength(255),
        ], [this.takenNameValidator.validate.bind(this.takenNameValidator)]
      )
    });
  }

  onSubmit(): void {
    console.log('submitted !');
  }
}
