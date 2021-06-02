import {Injectable, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

export const CREATION = 'creation';
export const EDITION = 'edition';
export const NAV = 'navigation';


@Injectable({providedIn: 'root'})
export class WrapperService implements OnDestroy {

  // put it where needed
  public MODE_NAMES = {};

  mode: string;
  entity: string;

  // subscription: Subscription;

  constructor(private router: Router) {
    this.MODE_NAMES[CREATION] = 'Création';
    this.MODE_NAMES[EDITION] = 'Édition';
    this.MODE_NAMES[NAV] = 'Navigation';
    console.log(this.MODE_NAMES);
    // this.currentMode = 0;
    // console.log(this.router.url.includes('new'));
    // this.subscription = this.router.events
    //   .pipe(filter(event => event instanceof NavigationStart))
    //   .subscribe(() => console.log(this.router.url.includes('edit')));
  }

  ngOnDestroy(): void {
  }

  getModeName(): string {
    return this.MODE_NAMES[this.mode];
  }
}
