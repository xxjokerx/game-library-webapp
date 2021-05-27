import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../game.service';
import {CreatorService} from '../../../creators/creator.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Creator} from '../../../../model/creator.model';
import {Game} from '../../../../model/game.model';
import {CreatorRoleEnum} from '../../../../model/enum/creator-role.enum';

@Component({
  selector: 'app-creator-handler',
  templateUrl: './creator-handler.component.html',
  styleUrls: ['./creator-handler.component.css']
})
export class CreatorHandlerComponent implements OnInit, OnDestroy {
  allCreators$: Observable<Creator[]>;
  gameCreators$: BehaviorSubject<Creator[]> = new BehaviorSubject<Creator[]>(null);
  private game: Game;
  addModeOn: boolean;
  subscription: Subscription;
  actualEnumType: typeof CreatorRoleEnum;

  constructor(private service: GameService,
              private creatorService: CreatorService) {
    this.actualEnumType = CreatorRoleEnum;
  }

  ngOnInit(): void {
    this.addModeOn = false;
    this.subscription = this.service.detailedGame$.subscribe(game => {
      this.gameCreators$.next(game.creators);
      this.game = game;
    });
    this.allCreators$ = this.creatorService.fetchAllNames();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddMode(): void {
    this.addModeOn = true;
  }

  attachCreator($creator: Creator): void {
    this.addModeOn = false;
    if ($creator) {
      this.service.addCreator(this.game.id, $creator.id).subscribe(game => this.service.detailedGame$.next(game));
    }
  }

  onRemove(creatorId: number): void {
    this.service.unlinkCreator(this.game.id, creatorId).subscribe(game => this.service.detailedGame$.next(game));
  }
}
