import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ThemeDataService} from './theme-data.service';
import {ThemeService} from './theme.service';
import {Injectable} from '@angular/core';
import {Theme} from '../../model/theme.model';
import {Page} from '../../model/page.model';

@Injectable({providedIn: 'root'})
export class ThemeResolver implements Resolve<Page<Theme>> {

  constructor(private themesDataService: ThemeDataService,
              private themesService: ThemeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<Theme>> | Promise<Page<Theme>> | Page<Theme> {
    const themes: Page<Theme> = this.themesService.pagedThemes;

    if (!themes) {
      return this.themesDataService.fetchThemes();
    } else {
      return themes;
    }
  }
}
