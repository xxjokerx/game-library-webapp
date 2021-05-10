import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../game.service';
import {Game} from '../../../../model/game.model';
import {UniqueTitleValidator} from '../../../../shared/validators/unique-title-validator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-name-handler',
  templateUrl: './name-handler.component.html',
  styleUrls: ['./name-handler.component.css']
})
export class NameHandlerComponent implements OnInit {

  form: FormGroup;
  game: Game;

  constructor(private service: GameService,
              private takenNameValidator: UniqueTitleValidator,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.game = this.service.getDetailedGame();
    this.initForm();
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
    this.game.name = this.form.get('name').value;
    this.service.editGame(this.game.id, this.game)
      .pipe(map(game => this.game = game)).subscribe(() => {
      this.initForm();
      this.takenNameValidator.updateTakenNames();
      this.service.updateDetailedGame(this.game);
    });
  }


  onCancel(): void {
    this.form.patchValue({name: this.game.name});
  }

  onBack(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
