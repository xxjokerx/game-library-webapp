import {Injectable} from '@angular/core';
import {Creator} from '../../model/creator.model';
import {Page} from '../../model/page.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  pagedCreators: Page<Creator>;
  pagedCreatorsChanged: Subject<Page<Creator>> = new Subject<Page<Creator>>();

  constructor() {
  }

  setPagedCreators(pagedCreators: Page<Creator>): void {
    this.pagedCreators = pagedCreators;
    this.pagedCreatorsChanged.next(this.pagedCreators);
  }

  getCreatorById(id: number): Creator {
    return this.getCreators().find(creator => creator.id === id);
  }

  private getCreators(): Creator[] {
    return this.pagedCreators.content.slice();
  }

  updateCreators(creator: Creator): void {
    this.pagedCreators.content = this.pagedCreators.content.filter(streamedCreator => creator.id !== streamedCreator.id);
    this.pagedCreators.content.push(creator);

    this.pagedCreatorsChanged.next(this.pagedCreators);
  }
}
