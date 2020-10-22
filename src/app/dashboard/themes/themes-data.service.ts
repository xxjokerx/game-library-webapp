import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ThemesService} from './themes.service';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {PagedThemes} from '../../model/paged-themes.model';
import {Theme} from '../../model/theme.model';

@Injectable({providedIn: 'root'})
export class ThemesDataService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient,
              private themesService: ThemesService) {

    this.apiUrl = environment.apiUrl;
  }


  fetchThemes(page?: number): any {
    if (!page) {
      page = 0;
    }
    const args = '?page=' + page + '&size=1&sort=id';

    return this.http
      .get<PagedThemes>(this.apiUrl + '/admin/themes/page' + args, {responseType: 'json'})
      .pipe(
        tap(pagedThemes => {
          this.themesService.setPagedThemes(pagedThemes);
        })
      );
  }

  editTheme(id: number, editedTheme: Theme): any {
    return this.http
      .put<Theme>(this.apiUrl + '/admin/themes/' + id, editedTheme, {responseType: 'json'});
  }

  addTheme(newTheme: Theme): any {
    return this.http
      .post<Theme>(this.apiUrl + '/admin/themes', newTheme, {responseType: 'json'});
  }

  removeTheme(id: number): void {
    this.http.delete<Theme>(this.apiUrl + '/admin/themes/' + id)
      .subscribe(() => {
        this.themesService.removeThemeById(id);
      });
  }
}
