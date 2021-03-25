import {Injectable} from '@angular/core';
import {Game} from '../../model/game.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../configuration/configuration.service';
import {Page} from '../../model/page.model';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class GameService {
  apiUri: string;
  games: Game[];
  private filteredGames: Game[];
  pageChanged: Subject<Page<Game>> = new Subject<Page<Game>>();
  page: Page<Game> = {};
  private existingNames: string[] = [];

  constructor(private http: HttpClient,
              private config: ConfigurationService) {
    this.apiUri = environment.apiUri;
  }

  /* ============================================== REST API METHODS =================================================================== */
  /** Gets paged games */
  fetchGames(page?: number, keyword?: string): Observable<Page<Game>> {
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
      .get<Page<Game>>(this.apiUri + '/admin/games/page/overview' + params, {responseType: 'json'})
      .pipe(
        tap(
          pagedGames => {
            this.page = pagedGames;
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

}
