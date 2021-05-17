import {Injectable} from '@angular/core';
import {Theme} from '../../model/theme.model';
import {Observable, Subject} from 'rxjs';
import {Page} from '../../model/page.model';
import {Category} from '../../model/category.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ThemeService {
  apiUri: string;
  pagedThemes: Page<Theme>;
  pagedThemesChanged = new Subject<Page<Theme>>();
  existingThemes: Theme[];

  constructor(private http: HttpClient) {
    this.apiUri = environment.apiUri;
  }

  /* ============================================== REST API METHODS =================================================================== */
  fetchAll(): Observable<Theme[]> {
    return this.http
      .get<Category[]>(this.apiUri + '/admin/themes', {responseType: 'json'});
  }

  /* ================================================ OTHER METHODS ==================================================================== */

  setNames(themes: Theme[]): void {
    this.existingThemes = themes.slice();
    console.table(this.existingThemes);
  }

  getExistingThemes(): string[] {
    const themeAsList: string[] = [];
    this.existingThemes.forEach((theme: Theme) =>
      themeAsList.push(theme.name.toLowerCase().trim()));
    return themeAsList;
  }


  setPagedThemes(pagedThemes: Page<Theme>): void {
    this.pagedThemes = pagedThemes;
    this.pagedThemesChanged.next(this.pagedThemes);
  }

  getThemes(): Theme[] {
    return this.pagedThemes.content.slice();
  }

  getThemeById(givenId: number): Theme {
    return this.getThemes().find(theme => theme.id === givenId);
  }

  updateThemes(theme: Theme): void {
    this.pagedThemes.content = this.pagedThemes.content.filter(streamedTheme => theme.id !== streamedTheme.id);
    this.pagedThemes.content.push(theme);

    this.pagedThemesChanged.next(this.pagedThemes);
  }
}
