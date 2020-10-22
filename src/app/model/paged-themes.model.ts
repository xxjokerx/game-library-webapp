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
    offset: 0,
    pageSize: 20,
    pageNumber: 0,
    unpaged: false,
    paged: true
  };
}
