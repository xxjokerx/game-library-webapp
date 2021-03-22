import {Component, OnDestroy, OnInit} from '@angular/core';
import {Theme} from '../../../model/theme.model';
import {ThemeService} from '../theme.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {ThemeDataService} from '../theme-data.service';
import {Page} from '../../../model/page.model';
import {concatMap} from 'rxjs/operators';
import {DeletionHandlerService} from '../../../shared/deletion-handler.service';
import {ModelEnum} from '../../../model/enum/model.enum';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})
export class ThemeDetailComponent implements OnInit, OnDestroy {
  theme: Theme;
  private paramId: number;
  private subscription: Subscription;

  constructor(private themesService: ThemeService,
              private themeDataService: ThemeDataService,
              private route: ActivatedRoute,
              private router: Router,
              private deletionHandlerService: DeletionHandlerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
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
    this.router.navigate(['/admin/editor/themes/', this.theme.id, 'edit']);
  }

  onDelete(): void {
    const myObs = of(this.theme.id);
    myObs.pipe(
      concatMap(id => {
        return this.themeDataService.removeTheme(id);
      }),
      concatMap(() => {
        return this.themeDataService.fetchThemes();
      })
    ).subscribe();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onOpenConfirm(): void {
    this.deletionHandlerService.callModal(ModelEnum.THEME, this.theme, false)
      .then(value => {
        if (value === 'Ok click') {
          this.onDelete();
        }
      })
      .catch(err => console.log(err));
  }
}
