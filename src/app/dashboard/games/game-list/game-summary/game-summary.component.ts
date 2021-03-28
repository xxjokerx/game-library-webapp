import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DeletionHandlerService} from '../../../../shared/services/deletion-handler.service';
import {GameService} from '../../game.service';
import {Page} from '../../../../model/page.model';
import {ModelEnum} from '../../../../model/enum/model.enum';
import {GameOverview} from '../../../../model/game-overview.model';
import {ImageService} from '../../../../shared/services/image.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent implements OnInit, OnDestroy {
  game: GameOverview;
  dataUri;
  private paramId: number;
  private subscription: Subscription;
  numberOfPlayers: string;
  limitAge: string;

  constructor(private service: GameService,
              private imageService: ImageService,
              private route: ActivatedRoute,
              private router: Router,
              private deletionHandlerService: DeletionHandlerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = 'id';
      this.paramId = +params[id];
      this.game = this.service.getGameById(+this.paramId);
      console.log(this.game);
    });
    this.subscription = this.service.pageChanged
      .subscribe((page: Page<GameOverview>) => {
        this.game = page.content.find(game => game.id === this.paramId);
        this.dataUri = this.game.imageIds[0];
      });
    this.numberOfPlayers = this.service.buildPLayers(this.game.minNumberOfPlayer, this.game.maxNumberOfPlayer);
    this.limitAge = this.service.buildAge(this.game.minAge, this.game.maxAge, this.game.minMonth);
    this.imageService.fetchImage(this.game.imageIds[0]).subscribe(imageData => this.dataUri = 'data:image/png;base64,' + imageData);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit(): void {
    this.router.navigate(['/admin/editor/games/list']);
  }

  onDelete(): void {
    // this.service.deleteThenFetchAll(this.game.id);
    this.router.navigate(['../'], {relativeTo: this.route});
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

