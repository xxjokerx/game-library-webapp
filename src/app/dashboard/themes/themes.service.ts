import {Injectable} from '@angular/core';
import {PagedThemes} from '../../model/paged-themes.model';
import {Theme} from '../../model/theme.model';

@Injectable({providedIn: 'root'})
export class ThemesService {
  pagedThemes: PagedThemes;

  setThemes(themes: PagedThemes): void {
    this.pagedThemes = themes;
  }

  getThemes(): Theme[] {
    return this.pagedThemes.content.slice();
  }

  getThemeById(givenId: number): Theme {
    return this.getThemes().find(theme => theme.id === givenId);
  }
}
