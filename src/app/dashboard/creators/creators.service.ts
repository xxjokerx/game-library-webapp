import {Injectable} from '@angular/core';
import {Creator} from '../../model/creator.model';
import {Page} from '../../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class CreatorsService {
  pagedCreators: Page<Creator>;

  constructor() {
  }

  setPagedCreators(pagedCreators: Page<Creator>): void {
    this.pagedCreators = pagedCreators;
  }
}
