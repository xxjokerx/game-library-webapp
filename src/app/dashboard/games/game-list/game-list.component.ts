import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Game} from '../../../model/game.model';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Router} from '@angular/router';
import {GameService} from '../game.service';
import {Page} from '../../../model/page.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  filterForm: FormGroup;
  private subscription: Subscription;

  /* Pagination */
  games: Game[];
  totalElements: number;
  pageSize: number;
  page: number;

  constructor(private service: GameService,
              private configurationService: ConfigurationService,
              private router: Router) {
  }

  ngOnInit(): void {
    /* the resolver load paged games then ... */
    this.initForm();
    this.subscription = this.service.pageChanged.subscribe((page: Page<Game>) => {
      this.games = page.content.slice();
      console.log(this.games);
      this.totalElements = page.totalElements;
    });
    this.service.initPage();


  }

  initForm(): void {
    this.filterForm = new FormGroup({
      'keyword': new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  onFilter(): void {

  }

  onRefreshList(): void {

  }

  onDelete(): void {

  }

  onPageChange(): void {
    this.service.fetchGames(this.page);
    this.router.navigate(['/admin/editor/games']);
  }
}
