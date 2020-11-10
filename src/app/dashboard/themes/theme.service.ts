import {Injectable} from '@angular/core';
import {Theme} from '../../model/theme.model';
import {Subject} from 'rxjs';
import {Page} from '../../model/page.model';

@Injectable({providedIn: 'root'})
export class ThemeService {
  pagedThemes: Page<Theme>;
  pagedThemesChanged = new Subject<Page<Theme>>();

  constructor() {
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
