import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ThemesComponent} from './themes/themes.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';

function initializeKeycloak(keycloak: KeycloakService): any {
  return () =>
    keycloak.init({
      config: {
        url: environment.authUrl,
        realm: environment.realm,
        clientId: environment.clientId
      },
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ThemesComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    KeycloakAngularModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
