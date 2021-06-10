import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ImpersonalInterface} from '../../model/interface/impersonal.interface';
import {Observable} from 'rxjs';
import {ProductLineDataService} from './product-line-data.service';

@Injectable({providedIn: 'root'})
export class ProductLineNamesResolver implements Resolve<ImpersonalInterface[]> {


  constructor(private dataService: ProductLineDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ImpersonalInterface[]> | Promise<ImpersonalInterface[]> | ImpersonalInterface[] {
    return this.dataService.fetchNames();
  }
}
