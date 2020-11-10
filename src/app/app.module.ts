import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ThemesComponent} from './dashboard/themes/themes.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {ThemeEditComponent} from './dashboard/themes/theme-edit/theme-edit.component';
import {ThemeListComponent} from './dashboard/themes/theme-list/theme-list.component';
import {ThemeDetailComponent} from './dashboard/themes/theme-detail/theme-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigurationComponent} from './dashboard/configuration/configuration.component';
import {CreatorsComponent} from './dashboard/creators/creators.component';
import {CreatorListComponent} from './dashboard/creators/creator-list/creator-list.component';
import {CreatorEditComponent} from './dashboard/creators/creator-edit/creator-edit.component';
import {CreatorDetailComponent} from './dashboard/creators/creator-detail/creator-detail.component';
import {StringEnumPipe} from './dashboard/creators/string-enum.pipe';
import {ConfirmModalComponent} from './shared/confirm-modal/confirm-modal.component';
import {EnumToValuePipe} from './shared/enum-to-value.pipe';
import {ContactFormComponent} from './shared/contact-form/contact-form.component';
import {SimpleFilterFormComponent} from './dashboard/shared/simple-filter-form/simple-filter-form.component';
import {ProductLinesComponent} from './dashboard/product-line/product-lines.component';
import {ProductLineListComponent} from './dashboard/product-line/product-line-list/product-line-list.component';
import {ProductLineEditComponent} from './dashboard/product-line/product-line-edit/product-line-edit.component';
import {ProductLineDetailComponent} from './dashboard/product-line/product-line-detail/product-line-detail.component';

function initializeKeycloak(keycloak: KeycloakService): any {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.authUrl,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      bearerExcludedUrls: ['/assets', '/rest/v2/all'],
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ThemesComponent,
    HeaderComponent,
    DashboardComponent,
    ThemeEditComponent,
    ThemeListComponent,
    ThemeDetailComponent,
    ConfigurationComponent,
    CreatorsComponent,
    CreatorListComponent,
    CreatorEditComponent,
    CreatorDetailComponent,
    StringEnumPipe,
    ConfirmModalComponent,
    EnumToValuePipe,
    ContactFormComponent,
    SimpleFilterFormComponent,
    ProductLinesComponent,
    ProductLineListComponent,
    ProductLineEditComponent,
    ProductLineDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
export class AppModule {

}
