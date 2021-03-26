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
}
