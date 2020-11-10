import {Injectable} from '@angular/core';
import {ConfigurationService} from '../configuration/configuration.service';
import {HttpClient} from '@angular/common/http';
import {ProductLine} from '../../model/product-line.model';
import {Page} from '../../model/page.model';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {ProductLineService} from './product-line.service';

@Injectable({providedIn: 'root'})
export class ProductLineDataService {
  apiUri: string;

  constructor(private productLineService: ProductLineService,
              private http: HttpClient,
              private configurationService: ConfigurationService) {
    this.apiUri = environment.apiUri;
  }

  fetchProductLines(page?: number, keyword?: string): any {
    if (!page) {
      page = 0;
    }
    let keywordParam = '';
    if (keyword) {
      keywordParam = '&search=' + keyword.toLowerCase();
    }
    const size = this.configurationService.getNumberOfElements();
    const params = '?page=' + page + '&size=' + size + '&sort=id' + keywordParam;

    return this.http
      .get<Page<ProductLine>>(this.apiUri + '/admin/product-lines/page' + params, {responseType: 'json'})
      .pipe(
        tap(pagedLines => {
          this.productLineService.setPagedLines(pagedLines);
        })
      );
  }
}
