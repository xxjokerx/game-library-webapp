import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../configuration/configuration.service';
import {Page} from '../../model/page.model';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {GameOverview} from '../../model/game-overview.model';

@Injectable({providedIn: 'root'})
export class GameService {
  apiUri: string;
  games: GameOverview[];
  private filteredGameOverviews: GameOverview[];
  pageChanged: Subject<Page<GameOverview>> = new Subject<Page<GameOverview>>();
  page: Page<GameOverview> = {};
  private existingNames: string[] = [];

  constructor(private http: HttpClient,
              private config: ConfigurationService) {
    this.apiUri = environment.apiUri;
  }

  /* ============================================== REST API METHODS =================================================================== */
  /** Gets paged games */
  fetchGames(page?: number, keyword?: string): Observable<Page<GameOverview>> {
    if (!page) {
      page = 0;
    }
    let keywordParam = '';
    if (keyword) {
      keywordParam = '&search=' + keyword.toLowerCase();
    }
    const size = this.config.getNumberOfElements();
    const params = '?page=' + page + '&size=' + size + '&sort=id' + keywordParam;
    return this.http
      .get<Page<GameOverview>>(this.apiUri + '/admin/games/page/overview' + params, {responseType: 'json'})
      .pipe(
        tap(
          pagedGameOverviews => {
            this.page = pagedGameOverviews;
          }
        )
      );
  }

  /* ================================================ OTHER METHODS ==================================================================== */
  /** sets the page to the debut value */
  initPage(): void {
    // todo remove this.fetchGames
    this.fetchGames();
    this.pageChanged.next(this.page);
  }

  /** Updates the paged object as well as notifier the Subject a change occurred */
  updatePage(): void {
    this.pageChanged.next(this.page);
  }

  /** finds and return the game with the given id */
  getGameById(id: number): GameOverview {
    return this.page.content.find(game => game.id === id);
  }

  /** Get min and max numbers of player the return a string */
  buildPLayers(min: number, max: number): string {
    let str = '';
    if (max === 1) {
      str = 'Jeu solo';
    }
    if (max > 1 && max === min) {
      str = min.toString() + ' joueurs';
    } else if (max > min) {
      str = 'De ' + min.toString() + ' à ' + max.toString() + ' joueurs';
    } else if (max === 0) {
      str = 'À partir de ' + min.toString() + ' joueur(s)';
    }
    return str;
  }

  buildAge(minAge: number, maxAge: number, minMonth: number): string {
    let str = '';
    if (minAge === 0 && maxAge === 0 && minMonth === 0) {
      return str;
    } else if (maxAge === 0) {
      str = 'À partir de ';
      if (minAge > 1) {
        str += minAge.toString() + ' ans.';
      } else if (minAge === 1) {
        str += minAge.toString() + ' an.';
      } else if (minMonth >= 1) {
        str += minMonth.toString() + 'mois.';
      }
      return str;
    } else if (maxAge > 0) {
      str = 'De ';
      if (minAge > 0) {
        str += minAge.toString() + ' à ' + maxAge.toString() + ' ans.';
      } else if (minMonth > 0 && maxAge > 1) {
        str += minMonth.toString() + ' mois à ' + maxAge.toString() + ' ans.';
      } else if (minMonth > 0 && maxAge === 1) {
        str += minMonth.toString() + ' mois à ' + maxAge.toString() + ' an.';
      }
    }
    return str;
  }
}
