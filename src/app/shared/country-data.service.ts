import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  constructor(private http: HttpClient) {
  }

  getList(): any {
    return this.http.get<{
      translations:
        { fr: string }
    }[]>(
      environment.api.country + '?fields=translations')
      .pipe(
        map(value => value.forEach(e => console.log(e.translations.fr)))
      )
      .subscribe();
  }
}
