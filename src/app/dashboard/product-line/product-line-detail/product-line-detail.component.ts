import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductLine} from '../../../model/product-line.model';
import {of, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Page} from '../../../model/page.model';
import {concatMap} from 'rxjs/operators';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {ProductLineService} from '../product-line.service';
import {ProductLineDataService} from '../product-line-data.service';

@Component({
  selector: 'app-product-line-detail',
  templateUrl: './product-line-detail.component.html',
  styleUrls: ['./product-line-detail.component.css']
})
export class ProductLineDetailComponent implements OnInit, OnDestroy {
  line: ProductLine;

  private paramId: number;
  private subscription: Subscription;

  constructor(private productLineService: ProductLineService,
              private productLineDataService: ProductLineDataService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = 'id';
      this.paramId = +params[id];
      this.line = this.productLineService.getProductLineById(+this.paramId);
    });
    this.subscription = this.productLineService.pagedLinesChanged.subscribe((pagedLines: Page<ProductLine>) => {
      this.line = pagedLines.content.find(line => line.id === this.paramId);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit(): void {
    this.router.navigate(['/admin/product-lines/', this.line.id, 'edit']);
  }

  onDelete(): void {
    const myObs = of(this.line.id);
    myObs.pipe(
      concatMap(id => {
        return this.productLineDataService.removeTheme(id);
      }),
      concatMap(() => {
        return this.productLineDataService.fetchProductLines();
      })
    ).subscribe();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onOpenConfirm(): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.deletedObjectType = 'la gamme';
    modalRef.componentInstance.deletedObjectName = this.line.name;
    modalRef.result
      .then(value => {
        if (value === 'Ok click') {
          this.onDelete();
        }
      })
      .catch(err => console.log(err));
  }
}
