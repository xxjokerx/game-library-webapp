import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ThemesDataService} from './themes-data.service';
import {ThemesService} from './themes.service';
import {Injectable} from '@angular/core';
import {Theme} from '../../model/theme.model';
import {Page} from '../../model/page.model';

@Injectable({providedIn: 'root'})
export class ThemesResolverService implements Resolve<Page<Theme>> {

  constructor(private themesDataService: ThemesDataService,
              private themesService: ThemesService) {
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
