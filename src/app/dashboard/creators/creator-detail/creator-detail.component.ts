import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CreatorService} from '../creator.service';
import {CreatorsDataService} from '../creators-data.service';
import {Creator} from '../../../model/creator.model';
import {of} from 'rxjs';
import {concatMap} from 'rxjs/operators';
import {DeletionHandlerService} from '../../../shared/deletion-handler.service';
import {ModelEnum} from '../../../model/enum/model.enum';

@Component({
  selector: 'app-creator-detail',
  templateUrl: './creator-detail.component.html',
  styleUrls: ['./creator-detail.component.css']
})
export class CreatorDetailComponent implements OnInit {
  creator: Creator;
  private paramId: number;

  constructor(private creatorsDataService: CreatorsDataService,
              private creatorsService: CreatorService,
              private route: ActivatedRoute,
              private router: Router,
              private deletionHandlerService: DeletionHandlerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = 'id';
      this.paramId = +params[id];
      this.creator = this.creatorsService.getCreatorById(+this.paramId);
    });
  }

  onEdit(): void {
    this.router.navigate(['/admin/creators/', this.creator.id, 'edit']);
  }

  onDelete(isCreatorDeletion: boolean): void {
    if (isCreatorDeletion) {

      const myObs = of(this.creator.id);
      myObs.pipe(
        concatMap(id => {
          return this.creatorsDataService.removeCreator(id);
        }),
        concatMap(() => {
          return this.creatorsDataService.fetchCreators();
        })
      ).subscribe();
    } else {

      const myObs = of(this.creator.contact.id);
      myObs.pipe(
        concatMap(id => {
          return this.creatorsDataService.removeContact(this.creator.id, id);
        }),
        concatMap(() => {
          return this.creatorsDataService.fetchCreators();
        })
      ).subscribe();
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onOpenConfirm(isCreatorDeletion: boolean): void {
    let chosenEnum = ModelEnum.CREATOR;
    if (!isCreatorDeletion) {
      chosenEnum = ModelEnum.CONTACT;
    }

    this.deletionHandlerService.callModal(chosenEnum, this.creator)
      .then(value => {
        if (value === 'Ok click') {
          this.onDelete(isCreatorDeletion);
          console.log('deleting...');
        }
      })
      .catch(err => console.log(err));
  }
}
