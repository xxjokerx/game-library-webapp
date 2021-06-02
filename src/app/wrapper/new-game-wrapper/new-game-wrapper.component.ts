import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-game-wrapper',
  templateUrl: './new-game-wrapper.component.html',
  styleUrls: ['./new-game-wrapper.component.css']
})
export class NewGameWrapperComponent implements OnInit {

  mode = 'Création';
  entity = 'Jeux';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.router.navigate(['/admin/editor/games/list']);
  }
}
