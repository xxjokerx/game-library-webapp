import {ModelInterface} from './interface/model.interface';
import {ImpersonalInterface} from './interface/impersonal.interface';
import {Category} from './category.model';
import {Creator} from './creator.model';
import {Game} from './game.model';

export class GameOverview implements ModelInterface, ImpersonalInterface {
  id?: number;
  gameCopyCount: number;
  name: string;
  coreGame?: Game;
  expansions?: Game[];
  description?: string;
  playTime?: string;
  minPlayer?: number;
  maxPlayer?: number;
  minMonth?: number;
  categories?: Category[];
  creators?: Creator[];
  imageIds?: number[];

}
