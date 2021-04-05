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
  dataUriArray: string[] = [];
  numberOfPlayers: string;
  limitAge: string;
  areRulesDisplayed: boolean;

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
    this.loadAllImages();
    this.areRulesDisplayed = false;
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

  toggleRuleDisplay(): void {
    this.areRulesDisplayed = !this.areRulesDisplayed;
  }
}
