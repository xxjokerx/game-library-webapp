import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../../model/game.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DeletionHandlerService} from '../../../../shared/services/deletion-handler.service';
import {GameService} from '../../game.service';
import {Page} from '../../../../model/page.model';
import {ModelEnum} from '../../../../model/enum/model.enum';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent implements OnInit, OnDestroy {
  game: Game;

  private paramId: number;
  private subscription: Subscription;

  constructor(private service: GameService,
              private route: ActivatedRoute,
              private router: Router,
              private deletionHandlerService: DeletionHandlerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = 'id';
      this.paramId = +params[id];
      this.game = this.service.getGameById(+this.paramId);
    });
    this.subscription = this.service.pageChanged.subscribe((page: Page<Game>) => {
      this.game = page.content.find(game => game.id === this.paramId);
    });
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
