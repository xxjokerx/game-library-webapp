import {Injectable} from '@angular/core';
import {Theme} from '../../model/theme.model';
import {Subject} from 'rxjs';
import {Page} from '../../model/page.model';
import {ConfigurationService} from '../configuration/configuration.service';

@Injectable({providedIn: 'root'})
export class ThemesService {
  pagedThemes: Page<Theme>;
  // private themes: Theme[];
  pagedThemesChanged = new Subject<Page<Theme>>();

  constructor(private configService: ConfigurationService) {
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
    this.pagedThemes.numberOfElements++;
    this.pagedThemes.totalElements++;

    this.pagedThemesChanged.next(this.pagedThemes);
  }

  removeThemeById(id: number): void {
    this.pagedThemes.content = this.pagedThemes.content.filter(streamedTheme => id !== streamedTheme.id);
    this.pagedThemes.numberOfElements--;
    this.pagedThemes.totalElements--;

    if (this.pagedThemes.numberOfElements === 0) {
      this.pagedThemes.totalPages--;
    }
    this.pagedThemesChanged.next(this.pagedThemes);
  }
}
