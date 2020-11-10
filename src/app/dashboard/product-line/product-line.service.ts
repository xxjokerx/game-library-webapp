import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ProductLine} from '../../model/product-line.model';
import {Page} from '../../model/page.model';

@Injectable({providedIn: 'root'})
export class ProductLineService {
  pagedLinesChanged: Subject<Page<ProductLine>> = new Subject<Page<ProductLine>>();
  pagedLines: Page<ProductLine>;

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
}
