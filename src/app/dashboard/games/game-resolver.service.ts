import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GameService} from './game.service';
import {Game} from '../../model/game.model';

@Injectable({providedIn: 'root'})
export class GameResolver implements Resolve<Game> {
  constructor(private service: GameService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Game> | Promise<Game> | Game {
    const id = 'id';
    return this.service.fetchGameById(route.params[id]);
  }
}
