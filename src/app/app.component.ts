import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'game-library-webapp';

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  onNavigateToTheme(): void {
    this.router.navigate(['themes'], {relativeTo: this.route});
  }
}
