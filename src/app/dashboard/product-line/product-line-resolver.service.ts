import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Page} from '../../model/page.model';
import {ProductLineService} from './product-line.service';
import {ProductLineDataService} from './product-line-data.service';
import {ProductLine} from '../../model/product-line.model';

@Injectable({providedIn: 'root'})
export class ProductLineResolverService {
  constructor(private productLineService: ProductLineService,
              private productLineDataService: ProductLineDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<ProductLine>> | Promise<Page<ProductLine>> | Page<ProductLine> {
    const pagedLines: Page<ProductLine> = this.productLineService.pagedLines;

    if (!pagedLines) {
      return this.productLineDataService.fetchProductLines();
    }
    return pagedLines;
  }
}
