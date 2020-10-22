import {Injectable} from '@angular/core';
import {PagedThemes} from '../../model/paged-themes.model';
import {Theme} from '../../model/theme.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ThemesService {
  pagedThemes: PagedThemes;
  private themes: Theme[];
  themesChanged = new Subject<Theme[]>();

  setPagedThemes(pagedThemes: PagedThemes): void {
    this.pagedThemes = pagedThemes;
    this.themes = pagedThemes.content;
    this.themesChanged.next(this.themes.slice());
  }

  getThemes(): Theme[] {
    return this.themes.slice();
  }

  getThemeById(givenId: number): Theme {
    return this.getThemes().find(theme => theme.id === givenId);
  }

  updateThemes(theme: Theme): void {
    this.themes = this.themes.filter(streamedTheme => theme.id !== streamedTheme.id);
    this.themes.push(theme);
    this.themesChanged.next(this.themes.slice());
  }

  removeThemeById(id: number): void {
    this.themes = this.themes.filter(streamedTheme => id !== streamedTheme.id);
    this.themesChanged.next(this.themes);
  }
}
