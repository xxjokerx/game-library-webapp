import {Injectable} from '@angular/core';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Creator} from '../model/creator.model';
import {ModelEnum} from '../model/enum/model.enum';
import {Theme} from '../model/theme.model';
import {ModelInterface} from '../model/interface/model.interface';

@Injectable({providedIn: 'root'})
export class DeletionHandlerService {

  constructor(private modalService: NgbModal) {
  }

  callModal(modelAsEnum: ModelEnum, associatedModel: ModelInterface): Promise<any> {
    let objectType = '';
    let objectName = '';

    switch (modelAsEnum) {
      case ModelEnum.CONTACT: {
        objectType = 'les coordonnées associées à ce contact';
        objectName = (associatedModel as Creator).firstName + ' ' + (associatedModel as Creator).lastName;
        break;
      }
      case ModelEnum.CREATOR: {
        objectType = 'l\'auteur';
        objectName = (associatedModel as Creator).firstName + ' ' + (associatedModel as Creator).lastName;
        break;
      }
      case ModelEnum.THEME: {
        objectType = 'le thème';
        objectName = (associatedModel as Theme).name;
        break;
      }
    }

    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.deletedObjectType = objectType;
    modalRef.componentInstance.deletedObjectName = objectName;
    return modalRef.result;
  }
}
