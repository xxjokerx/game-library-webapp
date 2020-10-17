import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  userLoaded: boolean;
  adminLoaded: boolean;
  themesLoaded: boolean;

  constructor() {
  }

  ngOnInit(): void {
    console.log('ThemesComponent init');
  }

  onFetchUser(): void {
  }

  onFetchAdmin(): void {
  }

  onFetchThemes(): void {
  }
}
