import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../dashboard/games/game.service';
import {WrapperService} from '../../shared/services/wrapper.service';

@Component({
  selector: 'app-locked-mode-wrapper',
  templateUrl: './game-edit-wrapper.component.html',
  styleUrls: ['./game-edit-wrapper.component.css']
})
export class GameEditWrapperComponent implements OnInit, OnDestroy {

  mode = 'Édition';
  entity = 'Jeux';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: GameService,
              private wrapperService: WrapperService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.wrapperService.ngOnDestroy();
  }

  onBack(): void {
    this.service.game ? this.router.navigate(['/admin/editor/games/list', this.service.game.id])
      : this.router.navigate(['/admin/editor/games/list']);
  }
}
