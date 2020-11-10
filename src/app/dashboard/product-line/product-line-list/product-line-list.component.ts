import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductLineService} from '../product-line.service';
import {ProductLineDataService} from '../product-line-data.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Page} from '../../../model/page.model';
import {ProductLine} from '../../../model/product-line.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-line-list',
  templateUrl: './product-line-list.component.html',
  styleUrls: ['./product-line-list.component.css']
})
export class ProductLineListComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  totalElements: number;
  pageSize: number;
  page: number;
  private subscription: Subscription;
  lines: ProductLine[];

  constructor(private productLineService: ProductLineService,
              private productLineDataService: ProductLineDataService,
              private configurationService: ConfigurationService,
              private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
    this.fetchProductLines();
    this.subscription = this.productLineService.pagedLinesChanged.subscribe((pagedLines: Page<ProductLine>) => {
      this.lines = pagedLines.content.slice();
      this.totalElements = pagedLines.totalElements;
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRefreshList(): void {
    this.fetchProductLines();
    this.router.navigate(['/admin/product-lines']);
  }

  onPageChange(): void {
    this.fetchProductLines(this.page);
    this.router.navigate(['/admin/product-lines']);
  }

  onFilter(): void {
    this.fetchProductLines(0, this.filterForm.value.keyword);
    this.initForm();
    this.router.navigate(['/admin/product-lines']);
  }

  onDelete(): void {
    this.initForm();
  }

  private fetchProductLines(page?: number, keyword?: string): void {
    this.productLineDataService.fetchProductLines(page, keyword).subscribe((pagedLines: Page<ProductLine>) => {
      this.page = pagedLines.pageable.pageNumber + 1;
      this.totalElements = pagedLines.totalElements;
      this.pageSize = this.configurationService.getNumberOfElements();
    });
  }

  private initForm(): void {
    this.filterForm = new FormGroup({
      'keyword': new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }
}
