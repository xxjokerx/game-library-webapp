import {Injectable} from '@angular/core';
import {ConfigurationService} from '../configuration/configuration.service';
import {HttpClient} from '@angular/common/http';
import {ProductLine} from '../../model/product-line.model';
import {Page} from '../../model/page.model';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {ProductLineService} from './product-line.service';
import {ImpersonalInterface} from '../../model/interface/impersonal.interface';

@Injectable({providedIn: 'root'})
export class ProductLineDataService {
  apiUri: string;

  constructor(private productLineService: ProductLineService,
              private http: HttpClient,
              private configurationService: ConfigurationService) {
    this.apiUri = environment.apiUri;
  }

  fetchNames(): any {
    return this.http
      .get<ImpersonalInterface[]>(this.apiUri + '/admin/product-lines/names')
      .pipe(
        tap(names => this.productLineService.setNames(names))
      );
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

  removeTheme(id: number): any {
    return this.http.delete(this.apiUri + '/admin/product-lines/' + id);
  }

  editLine(id: number, newLine: ProductLine): any {
    return this.http.put<ProductLine>(this.apiUri + '/admin/product-lines/' + id, newLine, {responseType: 'json'});
  }

  addLine(newLine: ProductLine): any {
    return this.http.post<ProductLine>(this.apiUri + '/admin/product-lines', newLine, {responseType: 'json'});
  }
}
