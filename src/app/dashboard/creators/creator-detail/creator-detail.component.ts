import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CreatorsService} from '../creators.service';
import {CreatorsDataService} from '../creators-data.service';
import {Creator} from '../../../model/creator.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-creator-detail',
  templateUrl: './creator-detail.component.html',
  styleUrls: ['./creator-detail.component.css']
})
export class CreatorDetailComponent implements OnInit {
  creator: Creator;
  private paramId: number;
  private routeSubscription: Subscription;

  constructor(private creatorsDataService: CreatorsDataService,
              private creatorsService: CreatorsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      const id = 'id';
      this.paramId = +params[id];
      this.creator = this.creatorsService.getCreatorById(+this.paramId);
    });
  }

  onEdit() {

  }

  onDelete() {

  }
}
