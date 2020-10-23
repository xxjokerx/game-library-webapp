import {Injectable} from '@angular/core';
import {Theme} from '../../model/theme.model';
import {Subject} from 'rxjs';
import {Page} from '../../model/page.model';

@Injectable({providedIn: 'root'})
export class ThemesService {
  pagedThemes: Page<Theme>;
  private themes: Theme[];
  themesChanged = new Subject<Theme[]>();

  setPagedThemes(pagedThemes: Page<Theme>): void {
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
