import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Person} from '../../model/interface/person.interface';
import {CreatorDataService} from './creator-data.service';

@Injectable({providedIn: 'root'})
export class CreatorNameResolver implements Resolve<Person[]> {

  constructor(private dataService: CreatorDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Person[]> | Promise<Person[]> | Person[] {
    console.log('fetched names');
    return this.dataService.fetchNames();
  }

}
