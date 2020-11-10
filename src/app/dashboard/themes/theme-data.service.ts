import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ThemeService} from './theme.service';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Theme} from '../../model/theme.model';
import {ConfigurationService} from '../configuration/configuration.service';
import {Observable} from 'rxjs';
import {Page} from '../../model/page.model';

@Injectable({providedIn: 'root'})
export class ThemeDataService {
  private readonly apiUri: string;

  constructor(private http: HttpClient,
              private themesService: ThemeService,
              private configurationService: ConfigurationService) {

    this.apiUri = environment.apiUri;
  }


  fetchThemes(page?: number, keyword?: string): Observable<Page<Theme>> {
    if (!page) {
      page = 0;
    }
    let keywordParam = '';
    if (keyword) {
      keywordParam = '&search=' + keyword.toLowerCase();
    }
    const size = this.configurationService.getNumberOfElements();
    const args = '?page=' + page + '&size=' + size + '&sort=name' + keywordParam;

    return this.http
      .get<Page<Theme>>(this.apiUri + '/admin/themes/page' + args, {responseType: 'json'})
      .pipe(
        tap(pagedThemes => {
          this.themesService.setPagedThemes(pagedThemes);
        })
      );
  }

  editTheme(id: number, editedTheme: Theme): any {
    return this.http
      .put<Theme>(this.apiUri + '/admin/themes/' + id, editedTheme, {responseType: 'json'});
  }

  addTheme(newTheme: Theme): any {
    return this.http
      .post<Theme>(this.apiUri + '/admin/themes', newTheme, {responseType: 'json'});
  }

  removeTheme(id: number): any {
    return this.http.delete<Theme>(this.apiUri + '/admin/themes/' + id);
  }
}
