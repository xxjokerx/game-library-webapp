import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SidebarControlService {

  isCollapseSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  expand(): void {
    console.log('this.isCollapseSubject.next(false);');
    this.isCollapseSubject.next(false);
  }

  collapse(): void {
    console.log('this.isCollapseSubject.next(true);');
    this.isCollapseSubject.next(true);
  }
}
