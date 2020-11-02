import {Injectable} from '@angular/core';
import {Creator} from '../../model/creator.model';
import {Page} from '../../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  pagedCreators: Page<Creator>;
  hasContact: boolean;

  constructor() {
    this.hasContact = false;
  }

  setPagedCreators(pagedCreators: Page<Creator>): void {
    this.pagedCreators = pagedCreators;
  }

  getCreatorById(id: number): Creator {
    return this.getCreator().find(creator => creator.id === id);
  }

  private getCreator(): Creator[] {
    return this.pagedCreators.content.slice();
  }


}
