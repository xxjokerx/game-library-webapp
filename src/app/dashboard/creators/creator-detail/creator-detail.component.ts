import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CreatorsService} from '../creators.service';
import {CreatorsDataService} from '../creators-data.service';
import {Creator} from '../../../model/creator.model';
import {of} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {concatMap} from 'rxjs/operators';

@Component({
  selector: 'app-creator-detail',
  templateUrl: './creator-detail.component.html',
  styleUrls: ['./creator-detail.component.css']
})
export class CreatorDetailComponent implements OnInit {
  creator: Creator;
  private paramId: number;

  constructor(private creatorsDataService: CreatorsDataService,
              private creatorsService: CreatorsService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
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

  onDelete(): void {
    const myObs = of(this.creator.id);
    myObs.pipe(
      concatMap(id => {
        return this.creatorsDataService.removeCreator(id);
      }),
      concatMap(() => {
        return this.creatorsDataService.fetchCreators();
      })
    ).subscribe();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onOpenConfirm(): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.deletedObjectType = 'le créateur';
    modalRef.componentInstance.deletedObjectName = this.creator.firstName + ' ' + this.creator.lastName;
    modalRef.result
      .then(value => {
        if (value === 'Ok click') {
          this.onDelete();
        }
      })
      .catch(err => console.log(err));
  }
}
