import {Injectable} from '@angular/core';
import {PagedThemes} from './paged-themes.model';

@Injectable({providedIn: 'root'})
export class ThemesService {
  themes: PagedThemes;

  setThemes(themes: PagedThemes): void {
    this.themes = themes;
  }
}
