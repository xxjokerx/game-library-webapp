import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../../../model/category.model';
import {GameService} from '../../game.service';
import {CategoryService} from '../../../categories/category.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from '../../../../model/game.model';

@Component({
  selector: 'app-category-handler',
  templateUrl: './category-handler.component.html',
  styleUrls: ['./category-handler.component.css']
})
export class CategoryHandlerComponent implements OnInit, OnDestroy {
  allCategories$: Observable<Category[]>;
  gameCategories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(null);
  addModeOn: boolean;
  private game: Game;

  constructor(private service: GameService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.addModeOn = false;
    this.service.detailedGame$.subscribe(game => {
      this.gameCategories$.next(game.categories);
      this.game = game;
    });
    this.allCategories$ = this.categoryService.fetchAll();
  }

  ngOnDestroy(): void {
    this.gameCategories$.unsubscribe();
  }

  onAddMode(): void {
    this.addModeOn = true;
  }

  attachCategory($cat: Category): void {
    this.addModeOn = false;
    if ($cat) {
      this.service.addCategory(this.game.id, $cat.id).subscribe(game => this.service.detailedGame$.next(game));
    }
  }

  onRemove(categoryId: number): void {
    this.service.unlinkCategory(this.game.id, categoryId).subscribe(game => this.service.detailedGame$.next(game));
  }
}
