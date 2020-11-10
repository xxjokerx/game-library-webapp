import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../theme.service';
import {ThemeDataService} from '../theme-data.service';
import {Theme} from '../../../model/theme.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Page} from '../../../model/page.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit, OnDestroy {

  themes: Theme[];
  private subscription: Subscription;
  page: number;
  totalElements: number;
  pageSize: number;
  filterForm: FormGroup;

  constructor(private themesService: ThemeService,
              private themesDataService: ThemeDataService,
              private configurationService: ConfigurationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchThemes();
    this.subscription = this.themesService.pagedThemesChanged.subscribe((pagedThemes: Page<Theme>) => {
      this.themes = pagedThemes.content.slice();
      this.totalElements = pagedThemes.totalElements;
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRefreshList(): void {
    this.fetchThemes();
    this.router.navigate(['/admin/themes']);
  }

  onPageChange(): void {
    this.fetchThemes(this.page);
    this.router.navigate(['/admin/themes']);
  }

  onFilter(): void {
    this.fetchThemes(0, this.filterForm.value.keyword);
    this.initForm();
    this.router.navigate(['/admin/themes']);
  }

  onDelete(): void {
    this.initForm();
  }

  private fetchThemes(page?: number, keyword?: string): void {
    this.themesDataService.fetchThemes(page, keyword).subscribe(() => {
      this.page = this.themesService.pagedThemes.pageable.pageNumber + 1;
      this.totalElements = this.themesService.pagedThemes.totalElements;
      this.pageSize = this.configurationService.getNumberOfElements();
    });
  }

  private initForm(): void {
    this.filterForm = new FormGroup({
      'keyword': new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }
}
