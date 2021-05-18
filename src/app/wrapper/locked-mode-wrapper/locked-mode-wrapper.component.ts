import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GameService} from '../../dashboard/games/game.service';

@Component({
  selector: 'app-locked-mode-wrapper',
  templateUrl: './locked-mode-wrapper.component.html',
  styleUrls: ['./locked-mode-wrapper.component.css']
})
export class LockedModeWrapperComponent implements OnInit {

  editString = 'Édition';

  constructor(private router: Router,
              private service: GameService) {
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.service.game ? this.router.navigate(['/admin/editor/games/list', this.service.game.id])
      : this.router.navigate(['/admin/editor/games/list']);
  }
}
