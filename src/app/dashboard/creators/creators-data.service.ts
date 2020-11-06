import {Injectable} from '@angular/core';
import {CreatorService} from './creator.service';
import {HttpClient} from '@angular/common/http';
import {Page} from '../../model/page.model';
import {Creator} from '../../model/creator.model';
import {ConfigurationService} from '../configuration/configuration.service';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreatorsDataService {
  apiUri: string;

  constructor(private creatorsService: CreatorService,
              private http: HttpClient,
              private configurationService: ConfigurationService) {

    this.apiUri = environment.apiUrl;
  }

  fetchCreators(page?: number): any {
    if (!page) {
      page = 0;
    }

    const size = this.configurationService.getNumberOfElements();
    const args = '?page=' + page + '&size=' + size + '&sort=id';

    return this.http
      .get<Page<Creator>>(this.apiUri + '/admin/creators/page' + args, {responseType: 'json'})
      .pipe(
        tap(pagedCreators => {
          this.creatorsService.setPagedCreators(pagedCreators);
        })
      );
  }

  removeCreator(id: number): any {
    return this.http
      .delete(this.apiUri + '/admin/creators/' + id);
  }

  removeContact(creatorId: number, contactId): any {
    return this.http
      .delete(this.apiUri + '/admin/creators/' + creatorId + '/contact/' + contactId);
  }

  editCreator(id: number, editedCreator: Creator): void {
    this.http
      .put<Creator>(this.apiUri + '/admin/creators/' + id, editedCreator, {responseType: 'json'})
      .subscribe(creator => this.creatorsService.updateCreators(creator));
  }

  addCreator(newCreator: Creator, hasContact: boolean): void {
    let contactParam = '';
    if (hasContact) {
      contactParam = '?has-contact=true';
    }
    this.http
      .post<Creator>(this.apiUri + '/admin/creators' + contactParam, newCreator, {responseType: 'json'})
      .subscribe(creator => this.creatorsService.updateCreators(creator));
  }
}
