import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ThemesDataService} from './themes-data.service';
import {ThemesService} from './themes.service';
import {Injectable} from '@angular/core';
import {PagedThemes} from '../../model/paged-themes.model';

@Injectable({providedIn: 'root'})
export class ThemesResolverService implements Resolve<PagedThemes> {

  constructor(private themesDataService: ThemesDataService,
              private themesService: ThemesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedThemes> | Promise<PagedThemes> | PagedThemes {
    const themes: PagedThemes = this.themesService.pagedThemes;

    if (!themes) {
      return this.themesDataService.fetchThemes();
    } else {
      return themes;
    }
  }
}
