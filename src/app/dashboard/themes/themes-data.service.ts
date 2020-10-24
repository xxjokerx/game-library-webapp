import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ThemesService} from './themes.service';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {PagedThemes} from '../../model/paged-themes.model';
import {Theme} from '../../model/theme.model';
import {ConfigurationService} from '../configuration/configuration.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ThemesDataService {
  private readonly apiUri: string;

  constructor(private http: HttpClient,
              private themesService: ThemesService,
              private configurationService: ConfigurationService) {

    this.apiUri = environment.apiUrl;
  }


  fetchThemes(page?: number): Observable<PagedThemes> {
    if (!page) {
      page = 0;
    }
    const size = this.configurationService.getNumberOfElements();
    const args = '?page=' + page + '&size=' + size + '&sort=id';

    return this.http
      .get<PagedThemes>(this.apiUri + '/admin/themes/page' + args, {responseType: 'json'})
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
