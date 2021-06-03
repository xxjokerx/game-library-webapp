import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {NAV, WrapperService} from '../services/wrapper.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NavResolverService implements Resolve<void> {

  constructor(private wrapperService: WrapperService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    this.wrapperService.entity = null;
    this.wrapperService.mode = NAV;
  }


}
