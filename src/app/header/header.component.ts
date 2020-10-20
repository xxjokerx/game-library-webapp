import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private keycloak: KeycloakService,
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
  }

  onLogout(): void {
    this.keycloak.logout(environment.keycloak.clientBaseUrl);
  }
}
