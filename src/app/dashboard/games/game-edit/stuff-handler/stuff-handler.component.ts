import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Game} from '../../../../model/game.model';
import {GameService} from '../../game.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-stuff-handler',
  templateUrl: './stuff-handler.component.html',
  styleUrls: ['./stuff-handler.component.css']
})
export class StuffHandlerComponent implements OnInit {


  form: FormGroup;
  game: Game;

  constructor(private service: GameService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.game = this.service.getDetailedGame();
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      'stuff': new FormControl(this.game.stuff, [
          Validators.maxLength(1000),
        ], []
      )
    });
  }

  onSubmit(): void {
    this.game.stuff = this.form.get('stuff').value;
    this.service.editGame(this.game.id, this.game)
      .pipe(map(game => this.game = game)).subscribe(() => {
      this.initForm();
      this.service.updateDetailedGame(this.game);
    });
    this.router.navigate(['./..'], {relativeTo: this.route});

  }


  onCancel(): void {
    this.form.patchValue({name: this.game.stuff});
  }

  onBack(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
