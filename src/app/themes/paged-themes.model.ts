import {Theme} from './theme.model';

export class PagedThemes {
  content: Theme[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  first: boolean;
  sort: string;
  numberOfElements: number;
}
