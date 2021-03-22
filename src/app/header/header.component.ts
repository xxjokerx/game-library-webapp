import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {SidebarControlService} from '../shared/sidebar-control.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  isAdministrator: boolean;
// Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  isMenuCollapsed = true;
  setNavOpened: any;

  constructor(private keycloak: KeycloakService,
              private sidebarService: SidebarControlService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.keycloak.isLoggedIn()
      .then(authenticatedStatus => {
        this.isAuthenticated = authenticatedStatus;
      })
      .catch(error => {
        console.log(error);
      });
    this.isAdministrator = this.keycloak.isUserInRole('ADMIN');
  }

  onLogin(): void {
    this.keycloak.login({redirectUri: window.location.origin + this.router.url});
  }

  onLogout(): void {
    this.keycloak.logout(environment.keycloak.clientBaseUrl);
  }

  onOpenGamesNavbar(): void {
    this.router.navigate(['/admin/editor']);
    this.sidebarService.expand();
  }

  onOpenLoansNavbar(): void {
    this.router.navigate(['/admin/loans']);
  }

  onOpenUsersNavbar(): void {
    this.router.navigate(['/admin/users']);
  }
}
