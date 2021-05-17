import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../game.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../../../model/game.model';

@Component({
  selector: 'app-info-handler',
  templateUrl: './info-handler.component.html',
  styleUrls: ['./info-handler.component.css']
})
export class InfoHandlerComponent implements OnInit {
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
      'gameNature': new FormControl(this.game.nature, [Validators.required]),
      'numberOfPlayers': new FormGroup({
        'min': new FormControl(this.game.minNumberOfPlayer),
        'max': new FormControl(this.game.maxNumberOfPlayer),
      }),
      'duration': new FormControl(this.game.playTime),
      'ageRange': new FormGroup({
        'month': new FormControl(this.game.minMonth),
        'min': new FormControl(this.game.minAge),
        'max': new FormControl(this.game.minNumberOfPlayer)
      }),
    });
  }

  onSubmit(): void {

  }

  onCancel(): void {

  }

  onBack(): void {

  }
}
