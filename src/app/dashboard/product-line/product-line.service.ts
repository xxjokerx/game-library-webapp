import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ProductLine} from '../../model/product-line.model';
import {Page} from '../../model/page.model';
import {ImpersonalInterface} from '../../model/interface/impersonal.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProductLineService {
  pagedLinesChanged: Subject<Page<ProductLine>> = new Subject<Page<ProductLine>>();
  pagedLines: Page<ProductLine>;
  existingNames: string[] = [];
  apiUri: string;

  constructor(private http: HttpClient) {
    this.apiUri = environment.apiUri;
  }

  setPagedLines(pagedLines: Page<ProductLine>): void {
    this.pagedLines = pagedLines;
    this.pagedLinesChanged.next(this.pagedLines);
  }

  getProductLineById(id: number): ProductLine {
    return this.getProductLines().find(creator => creator.id === id);
  }

  private getProductLines(): ProductLine[] {
    return this.pagedLines.content.slice();
  }

  updateLines(line: ProductLine): void {
    this.pagedLines.content = this.pagedLines.content.filter(streamedLine => line.id !== streamedLine.id);
    this.pagedLines.content.push(line);

    this.pagedLinesChanged.next(this.pagedLines);
  }

  setNames(names: ImpersonalInterface[]): void {
    names.forEach(line => this.existingNames.push(line.name.toLowerCase().trim()));
  }

  getExistingNames(): string[] {
    return this.existingNames;
  }

  /* ============================================== REST API METHODS =================================================================== */
  fetchAll(): Observable<ProductLine[]> {
    return this.http.get<ProductLine[]>(this.apiUri + '/admin/product-lines', {responseType: 'json'});
  }
}
