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
  pageable: {
    offset: number,
    pageSize: number,
    pageNumber: number,
    unpaged: false,
    paged: true
  };
}
