import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Game} from '../../../../model/game.model';
import {GameService} from '../../game.service';
import {ThemeService} from '../../../themes/theme.service';
import {Theme} from '../../../../model/theme.model';

@Component({
  selector: 'app-theme-handler',
  templateUrl: './theme-handler.component.html',
  styleUrls: ['./theme-handler.component.css']
})
export class ThemeHandlerComponent implements OnInit, OnDestroy {
  allThemes$: Observable<Theme[]>;
  gameThemes$: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>(null);
  addModeOn: boolean;
  private game: Game;
  subscription: Subscription;

  constructor(private service: GameService,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.addModeOn = false;
    this.subscription = this.service.detailedGame$.subscribe(game => {
      this.gameThemes$.next(game.themes);
      this.game = game;
    });
    this.allThemes$ = this.themeService.fetchAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddMode(): void {
    this.addModeOn = true;
  }

  attachTheme($theme: Theme): void {
    this.addModeOn = false;
    if ($theme) {
      this.service.addTheme(this.game.id, $theme.id).subscribe(game => this.service.detailedGame$.next(game));
    }
  }

  onRemove(themeId: number): void {
    this.service.unlinkTheme(this.game.id, themeId).subscribe(game => this.service.detailedGame$.next(game));
  }
}
