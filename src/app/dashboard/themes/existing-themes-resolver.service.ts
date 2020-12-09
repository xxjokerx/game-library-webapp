import {Injectable} from '@angular/core';
import {ThemeDataService} from './theme-data.service';
import {ThemeService} from './theme.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Theme} from '../../model/theme.model';

@Injectable({providedIn: 'root'})
export class ExistingThemesResolverService implements Resolve<Theme[]> {

  constructor(private themesDataService: ThemeDataService,
              private themesService: ThemeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Theme[]> | Promise<Theme[]> | Theme[] {
    return this.themesDataService.fetchNames();
  }
}
