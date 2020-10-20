import {Component, OnInit} from '@angular/core';
import {ThemesService} from './themes.service';
import {ThemesDataService} from './themes-data.service';
import {Theme} from './theme.model';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  themesLoaded: boolean;
  themes: Theme[];

  constructor(private themesService: ThemesService,
              private themesDataService: ThemesDataService) {
  }

  ngOnInit(): void {
    this.themesLoaded = false;
  }

  onFetchThemes(): void {
    this.themesDataService.fetchThemes().subscribe(() => {
      this.themesLoaded = true;
      this.themes = this.themesService.themes.content;
    });

  }

  onAddTheme(): void {

  }

  onDeleteTheme(): void {

  }
}
