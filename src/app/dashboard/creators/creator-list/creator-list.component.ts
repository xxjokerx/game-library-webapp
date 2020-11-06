import {Component, OnInit} from '@angular/core';
import {Creator} from '../../../model/creator.model';
import {CreatorService} from '../creator.service';
import {CreatorsDataService} from '../creators-data.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Page} from '../../../model/page.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-creator-list',
  templateUrl: './creator-list.component.html',
  styleUrls: ['./creator-list.component.css']
})
export class CreatorListComponent implements OnInit {
  creators: Creator[];
  private subscription: Subscription;
  totalElements: number;
  numberOfElementsPerPage: number;
  page: number;

  constructor(private creatorsService: CreatorService,
              private creatorsDataService: CreatorsDataService,
              private configurationService: ConfigurationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchCreators();
    this.subscription = this.creatorsService.pagedCreatorsChanged.subscribe((pagedCreators: Page<Creator>) => {
      this.creators = pagedCreators.content.slice();
      this.totalElements = pagedCreators.totalElements;
    });
  }

  onRefreshList(): void {
    this.fetchCreators();
    this.router.navigate(['/admin/creators']);
  }

  onPageChange(): void {
    this.fetchCreators(this.page);
    this.router.navigate(['/admin/creators']);
  }

  private fetchCreators(page?: number): void {
    if (!page) {
      page = 0;
    }
    this.creatorsDataService.fetchCreators(page).subscribe((pagedCreators: Page<Creator>) => {
      this.creators = pagedCreators.content;
      this.page = pagedCreators.pageable.pageNumber + 1;
      this.totalElements = pagedCreators.totalElements;
      this.numberOfElementsPerPage = this.configurationService.getNumberOfElements();
    });
  }
}
