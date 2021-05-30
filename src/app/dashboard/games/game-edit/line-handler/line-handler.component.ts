import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Game} from '../../../../model/game.model';
import {ProductLine} from '../../../../model/product-line.model';
import {GameService} from '../../game.service';
import {ProductLineService} from '../../../product-line/product-line.service';

@Component({
  selector: 'app-line-handler',
  templateUrl: './line-handler.component.html',
  styleUrls: ['./line-handler.component.css']
})
export class LineHandlerComponent implements OnInit, OnDestroy {
  allProductLines$: Observable<ProductLine[]>;
  gameProductLine$: BehaviorSubject<ProductLine> = new BehaviorSubject<ProductLine>(null);
  game: Game;
  addModeOn: boolean;
  subscription: Subscription;

  constructor(private service: GameService,
              private lineService: ProductLineService) {
  }

  ngOnInit(): void {
    this.addModeOn = false;
    this.subscription = this.service.detailedGame$.subscribe(game => {
      this.gameProductLine$.next(game.productLine);
      this.game = game;
    });
    this.allProductLines$ = this.lineService.fetchAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  attachProductLine($productLine: ProductLine): void {
    this.addModeOn = false;
    if ($productLine) {
      this.service.addProductLine(this.game.id, $productLine.id).subscribe(game => this.service.detailedGame$.next(game));
    }
  }

  onAddMode(): void {
    this.addModeOn = true;
  }

  onRemove(lineId: number): void {
    this.service.unlinkProductLine(this.game.id, lineId).subscribe(game => this.service.detailedGame$.next(game));
  }
}
