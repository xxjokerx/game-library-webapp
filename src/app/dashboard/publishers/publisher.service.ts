import {Injectable} from '@angular/core';
import {Page} from '../../model/page.model';
import {Subject} from 'rxjs';
import {Publisher} from '../../model/publisher.model';

@Injectable({providedIn: 'root'})
export class PublisherService {
  pagedPublishers: Page<Publisher>;
  pagedPublishersChanged: Subject<Page<Publisher>> = new Subject<Page<Publisher>>();

  constructor() {
  }

  setPagedPublishers(pagedPublishers: Page<Publisher>): void {
    this.pagedPublishers = pagedPublishers;
    this.pagedPublishersChanged.next(this.pagedPublishers);
  }

  getPublisherById(id: number): Publisher {
    return this.getPublishers().find(publisher => publisher.id === id);
  }

  private getPublishers(): Publisher[] {
    return this.pagedPublishers.content.slice();
  }

  updatePublishers(publisher: Publisher): void {
    this.pagedPublishers.content = this.pagedPublishers.content.filter(streamedPublisher => publisher.id !== streamedPublisher.id);
    this.pagedPublishers.content.push(publisher);

    this.pagedPublishersChanged.next(this.pagedPublishers);
  }
}
