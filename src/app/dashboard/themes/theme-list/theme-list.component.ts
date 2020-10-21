import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemesService} from '../themes.service';
import {ThemesDataService} from '../themes-data.service';
import {Theme} from '../../../model/theme.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit, OnDestroy {
  themesLoaded: boolean;
  themes: Theme[];
  keyword: any;
  private subscription: Subscription;

  constructor(private themesService: ThemesService,
              private themesDataService: ThemesDataService) {
  }

  ngOnInit(): void {
    this.themesDataService.fetchThemes().subscribe(() => {
      this.themesLoaded = true;
      this.themes = this.themesService.getThemes();
    });
    this.subscription = this.themesService.themesChanged.subscribe((themes: Theme[]) => {
      this.themes = themes;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}
