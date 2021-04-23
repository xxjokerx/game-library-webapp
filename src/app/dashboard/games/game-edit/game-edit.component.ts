import {Component, OnInit} from '@angular/core';
import {Game} from '../../../model/game.model';
import {GameService} from '../game.service';
import {ImageService} from '../../../shared/services/image.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DeletionHandlerService} from '../../../shared/services/deletion-handler.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {

  game: Game;
  numberOfPlayers: string;
  limitAge: string;
  dataUriArray: string[] = [];

  constructor(private service: GameService,
              private imageService: ImageService,
              private route: ActivatedRoute,
              private router: Router,
              private deletionHandlerService: DeletionHandlerService) {
  }

  ngOnInit(): void {
    this.game = this.service.getDetailedGame();
    this.numberOfPlayers = this.service.buildPLayers(this.game.minNumberOfPlayer, this.game.maxNumberOfPlayer);
    this.limitAge = this.service.buildAge(this.game.minAge, this.game.maxAge, this.game.minMonth);
    this.loadAllImages();
  }

  private loadAllImages(): void {
    this.game.imageIds.forEach(id => {
      this.imageService
        .fetchImage(id)
        .subscribe(
          imageData => this.dataUriArray.push('data:image/png;base64,' + imageData)
          // imageData => this.dataUriArray[this.game.imageIds.indexOf(id, 0)] = 'data:image/png;base64,' + imageData
        );
    });
  }
}
