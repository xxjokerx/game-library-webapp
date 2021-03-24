import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Game} from '../../model/game.model';
import {GameService} from './game.service';
import {Page} from '../../model/page.model';

@Injectable({providedIn: 'root'})
export class GameResolver implements Resolve<Page<Game>> {
  constructor(private service: GameService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Page<Game>> | Promise<Page<Game>> | Page<Game> {

    return this.service.fetchGames();
  }
}
