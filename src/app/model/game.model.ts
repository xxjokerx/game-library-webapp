import {ModelInterface} from './interface/model.interface';
import {ImpersonalInterface} from './interface/impersonal.interface';
import {ProductLine} from './product-line.model';
import {Publisher} from './publisher.model';
import {Category} from './category.model';
import {Theme} from './theme.model';
import {Creator} from './creator.model';

export class Game implements ModelInterface, ImpersonalInterface {
  id?: number;
  name: string;
  coreGame?: Game;
  expansions?: Game[];
  description?: string;
  playTime?: string;
  minNumberOfPlayer: number;
  maxNumberOfPlayer: number;
  minMonth: number;
  minAge: number;
  maxAge: number;
  stuff?: string;
  preparation?: string;
  goal?: string;
  coreRules?: string;
  variant?: string;
  ending?: string;
  nature?: string;
  size?: string;
  editionNumber?: string;

  productLine?: ProductLine;
  publisher?: Publisher;
  categories?: Category[];
  themes?: Theme[];
  creators?: Creator[];
  imageIds?: number[];
  gameCopyCount: number;

}
