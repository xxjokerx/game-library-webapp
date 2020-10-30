import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {CountryModel} from '../model/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  countries: string[];

  constructor(private http: HttpClient) {
    this.countries = [];
  }

  getList(): void {
    this.http
      .get<CountryModel[]>(environment.api.country + '?fields=translations')
      .pipe(
        map(value => value.forEach(e => this.countries.push(e.translations.fr)))
      )
      .subscribe();
  }
}
