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
  userLoaded: boolean;
  adminLoaded: boolean;
  themesLoaded: boolean;
  themes: Theme[];

  constructor(private themesService: ThemesService,
              private themesDataService: ThemesDataService) {
  }

  ngOnInit(): void {
    this.userLoaded = false;
    this.adminLoaded = false;
    this.themesLoaded = false;
  }

  onFetchUser(): void {
  }

  onFetchAdmin(): void {
  }

  onFetchThemes(): void {
    this.themesDataService.fetchThemes().subscribe(data => {
      console.log(data);
      this.themesLoaded = true;
      this.themes = this.themesService.themes.content;
    });

  }
}
