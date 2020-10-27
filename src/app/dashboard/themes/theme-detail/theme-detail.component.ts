import {Component, OnDestroy, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme.model';
import {ThemesService} from '../themes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ThemesDataService} from '../themes-data.service';
import {Page} from '../../../model/page.model';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})
export class ThemeDetailComponent implements OnInit, OnDestroy {
  theme: Theme;
  private paramId: number;
  private routeSubscription: Subscription;
  private subscription: Subscription;

  constructor(private themesService: ThemesService,
              private themeDataService: ThemesDataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      const id = 'id';
      this.paramId = +params[id];
      this.theme = this.themesService.getThemeById(+this.paramId);
    });
    this.subscription = this.themesService.pagedThemesChanged.subscribe((pagedThemes: Page<Theme>) => {
      this.theme = pagedThemes.content.find(theme => theme.id === this.paramId);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit(): void {
    this.router.navigate(['/admin/themes/', this.theme.id, 'edit']);
  }

  onDelete(): void {
    this.themeDataService.removeTheme(this.theme.id).subscribe(() => {
      this.themesService.removeThemeById(this.theme.id);
    });
    this.router.navigate(['../'], {relativeTo: this.route});
    // Improves things but not perfect
    this.themesService.pagedThemes.numberOfElements = this.themesService.pagedThemes.numberOfElements - 1;
    if (this.themesService.pagedThemes.numberOfElements === 0) {
      this.themeDataService.fetchThemes().subscribe();
    }
  }
}
