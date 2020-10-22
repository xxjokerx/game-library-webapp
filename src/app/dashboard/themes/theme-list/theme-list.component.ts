import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemesService} from '../themes.service';
import {ThemesDataService} from '../themes-data.service';
import {Theme} from '../../../model/theme.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit, OnDestroy {


  themes: Theme[];
  keyword: any;
  private themeChangedSubscription: Subscription;
  page: number;
  totalElements: number;

  toRemove = 0;

  constructor(private themesService: ThemesService,
              private themesDataService: ThemesDataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchThemes();
    this.themeChangedSubscription = this.themesService.themesChanged.subscribe((themes: Theme[]) => {
      this.themes = themes;
    });
  }


  onRefreshList(): void {
    this.fetchThemes();
    this.router.navigate(['/admin/themes']);
  }

  ngOnDestroy(): void {
    this.themeChangedSubscription.unsubscribe();
  }

  private fetchThemes(page?: number): void {
    if (!page) {
      page = 0;
    }
    this.themesDataService.fetchThemes(page).subscribe(() => {
      this.themes = this.themesService.getThemes();
      this.page = this.themesService.pagedThemes.pageable.pageNumber + 1;
      this.totalElements = this.themesService.pagedThemes.totalElements;
    });
  }

  onPageChange(): void {
    // todo fetch the right page
    this.fetchThemes(this.page);
  }
}
