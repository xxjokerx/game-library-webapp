import {Injectable, OnDestroy} from '@angular/core';
import {EditorModeEnum} from '../../model/enum/editor-mode.enum';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class WrapperService implements OnDestroy {

  currentMode: EditorModeEnum;
  subscription: Subscription;

  constructor(private router: Router) {
    this.currentMode = 0;
    console.log(this.router.url.includes('new'));
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => console.log(this.router.url.includes('edit')));
  }

  ngOnDestroy(): void {
    console.log('unsubscription');
    this.subscription.unsubscribe();
  }
}
