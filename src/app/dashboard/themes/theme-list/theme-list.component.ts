import {Component, OnInit} from '@angular/core';
import {ThemesService} from '../themes.service';
import {ThemesDataService} from '../themes-data.service';
import {Theme} from '../../../model/theme.model';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {
  themesLoaded: boolean;
  themes: Theme[];
  keyword: any;

  constructor(private themesService: ThemesService,
              private themesDataService: ThemesDataService) {
  }

  ngOnInit(): void {
    this.themesDataService.fetchThemes().subscribe(() => {
      this.themesLoaded = true;
      this.themes = this.themesService.getThemes();
    });
  }
}
