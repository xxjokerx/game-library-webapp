import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ThemesService} from './themes.service';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {PagedThemes} from '../../model/paged-themes.model';

@Injectable({providedIn: 'root'})
export class ThemesDataService {
  private apiUrl: string;

  constructor(private http: HttpClient,
              private themesService: ThemesService) {
    this.apiUrl = environment.apiUrl;
  }


  fetchThemes(): any {
    return this.http
      .get<PagedThemes>(this.apiUrl + '/admin/themes/page', {responseType: 'json'})
      .pipe(
        tap(pagedThemes => {
          this.themesService.setThemes(pagedThemes);
        })
      );
  }
}
