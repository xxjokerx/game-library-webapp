import {Component, OnDestroy, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme.model';
import {ThemesService} from '../themes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})
export class ThemeDetailComponent implements OnInit, OnDestroy {
  theme: Theme;

  private subscription: Subscription;

  constructor(private themeService: ThemesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      const id = 'id';
      const paramId: number = +params[id];
      this.theme = this.themeService.getThemeById(+paramId);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit(): void {
    this.router.navigate(['/admin/themes/', this.theme.id, 'edit']);
  }
}
