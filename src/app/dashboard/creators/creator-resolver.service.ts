import {Injectable} from '@angular/core';
import {Creator} from '../../model/creator.model';
import {Page} from '../../model/page.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CreatorsService} from './creators.service';
import {CreatorsDataService} from './creators-data.service';

@Injectable({providedIn: 'root'})
export class CreatorResolverService implements Resolve<Page<Creator>> {

  constructor(private creatorService: CreatorsService,
              private creatorDataService: CreatorsDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<Creator>> | Promise<Page<Creator>> | Page<Creator> {
    const pagedCreators: Page<Creator> = this.creatorService.pagedCreators;

    if (!pagedCreators) {
      return this.creatorDataService.fetchCreators();
    }
    return pagedCreators;
  }


}
