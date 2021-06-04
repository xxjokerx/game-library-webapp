import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Game} from '../../../../model/game.model';
import {GameService} from '../../game.service';
import {GameNatureEnum} from '../../../../model/enum/game-nature.enum';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game-basics.component.html',
  styleUrls: ['./new-game-basics.component.css']
})
export class NewGameBasicsComponent implements OnInit {

  form: FormGroup;


  @Input()
  game: Game;

  constructor(private service: GameService) {
  }

  ngOnInit(): void {
    this.initForm(this.game);
  }

  initForm(currentGame?: Game): void {
    this.form = new FormGroup({
      'name': new FormControl(currentGame ? currentGame.name : ''),
      'minAge': new FormControl(currentGame ? currentGame.minAge : ''),
      'minMonth': new FormControl(currentGame ? currentGame.minMonth : ''),
      'maxAge': new FormControl(currentGame ? currentGame.maxAge : ''),
      'duration': new FormControl(currentGame ? currentGame.playTime : ''),
      'minNumberOfPlayer': new FormControl(currentGame ? currentGame.minNumberOfPlayer : ''),
      'maxNumberOfPlayer': new FormControl(currentGame ? currentGame.maxNumberOfPlayer : ''),
      'gameNature': new FormControl(currentGame ? currentGame.nature : GameNatureEnum.BOARD_GAME),
      'description': new FormControl(currentGame ? currentGame.description : '')
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  onNextPage(): void {
    console.log(this.form.value);
  }
}
