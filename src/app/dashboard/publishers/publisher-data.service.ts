import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../configuration/configuration.service';
import {environment} from '../../../environments/environment';
import {Page} from '../../model/page.model';
import {Publisher} from '../../model/publisher.model';
import {tap} from 'rxjs/operators';
import {PublisherService} from './publisher.service';

@Injectable({providedIn: 'root'})
export class PublisherDataService {
  apiUri: string;

  constructor(private publishersService: PublisherService,
              private http: HttpClient,
              private configurationService: ConfigurationService) {

    this.apiUri = environment.apiUri;
  }

  fetchPublishers(page?: number, keyword?: string): any {
    if (!page) {
      page = 0;
    }
    let keywordParam = '';
    if (keyword) {
      keywordParam = '&search=' + keyword.toLowerCase();
    }
    const size = this.configurationService.getNumberOfElements();
    const params = '?page=' + page + '&size=' + size + '&sort=id' + keywordParam;

    return this.http
      .get<Page<Publisher>>(this.apiUri + '/admin/publishers/page' + params, {responseType: 'json'})
      .pipe(
        tap(pagedPublishers => {
          this.publishersService.setPagedPublishers(pagedPublishers);
        })
      );
  }

  removePublisher(id: number): any {
    return this.http
      .delete(this.apiUri + '/admin/publishers/' + id);
  }

  removeContact(publisherId: number, contactId): any {
    return this.http
      .delete(this.apiUri + '/admin/publishers/' + publisherId + '/contact/' + contactId);
  }

  editPublisher(id: number, editedPublisher: Publisher): void {
    this.http
      .put<Publisher>(this.apiUri + '/admin/publishers/' + id, editedPublisher, {responseType: 'json'})
      .subscribe(publisher => this.publishersService.updatePublishers(publisher));
  }

  addPublisher(newPublisher: Publisher, hasContact: boolean): void {
    let contactParam = '';
    if (hasContact) {
      contactParam = '?has-contact=true';
    }
    this.http
      .post<Publisher>(this.apiUri + '/admin/publishers' + contactParam, newPublisher, {responseType: 'json'})
      .subscribe(publisher => this.publishersService.updatePublishers(publisher));
  }
}
