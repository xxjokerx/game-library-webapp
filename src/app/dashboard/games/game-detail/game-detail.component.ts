import {Component, OnInit} from '@angular/core';
import {Game} from '../../../model/game.model';
import {GameService} from '../game.service';
import {ImageService} from '../../../shared/services/image.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DeletionHandlerService} from '../../../shared/services/deletion-handler.service';
import {ModelEnum} from '../../../model/enum/model.enum';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  game: Game;
  dataUri;
  numberOfPlayers: string;
  limitAge: string;

  constructor(private service: GameService,
              private imageService: ImageService,
              private route: ActivatedRoute,
              private router: Router,
              private deletionHandlerService: DeletionHandlerService) {
  }

  ngOnInit(): void {
    const id = 'id';
    this.game = this.service.getDetailedGame();
    this.numberOfPlayers = this.service.buildPLayers(this.game.minNumberOfPlayer, this.game.maxNumberOfPlayer);
    this.limitAge = this.service.buildAge(this.game.minAge, this.game.maxAge, this.game.minMonth);
    this.imageService.fetchImage(this.game.imageIds[0]).subscribe(imageData => this.dataUri = 'data:image/png;base64,' + imageData);
    console.log(this.game);
  }

  onBack(): void {
    // this.router.navigate(['../45'], {relativeTo: this.route});
    this.router.navigate(['/admin/editor/games/list']);
  }

  onDelete(): void {
    this.service.deleteThenFetchAll(this.game.id);
    this.router.navigate(['/admin/editor/games/list']);
  }

  onOpenConfirm(): void {
    this.deletionHandlerService.callModal(ModelEnum.GAME, this.game, false)
      .then(value => {
        if (value === 'Ok click') {
          this.onDelete();
        }
      })
      .catch(err => console.log(err));
  }
}
