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
  private subscription: Subscription;

  constructor(private themesService: ThemesService,
              private themesDataService: ThemesDataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchThemes();
    this.subscription = this.themesService.themesChanged.subscribe((themes: Theme[]) => {
      this.themes = themes;
    });
  }


  onRefreshList(): void {
    this.fetchThemes();
    this.router.navigate(['/admin/themes']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  private fetchThemes(page?: number): void {
    this.themesDataService.fetchThemes().subscribe(() => {
      this.themes = this.themesService.getThemes();
    });
  }
}
