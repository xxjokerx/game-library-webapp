import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ThemesComponent} from './dashboard/themes/themes.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './shared/components/header/header.component';
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
import {StringEnumPipe} from './shared/pipes/string-enum.pipe';
import {ConfirmModalComponent} from './shared/components/confirm-modal/confirm-modal.component';
import {EnumToValuePipe} from './shared/pipes/enum-to-value.pipe';
import {ContactFormComponent} from './shared/components/contact-form/contact-form.component';
import {SimpleFilterFormComponent} from './dashboard/shared/simple-filter-form/simple-filter-form.component';
import {ProductLinesComponent} from './dashboard/product-line/product-lines.component';
import {ProductLineListComponent} from './dashboard/product-line/product-line-list/product-line-list.component';
import {ProductLineEditComponent} from './dashboard/product-line/product-line-edit/product-line-edit.component';
import {ProductLineDetailComponent} from './dashboard/product-line/product-line-detail/product-line-detail.component';
import {PublishersComponent} from './dashboard/publishers/publishers.component';
import {PublisherListComponent} from './dashboard/publishers/publisher-list/publisher-list.component';
import {PublisherDetailComponent} from './dashboard/publishers/publisher-detail/publisher-detail.component';
import {PublisherEditComponent} from './dashboard/publishers/publisher-edit/publisher-edit.component';
import {CategoriesComponent} from './dashboard/categories/categories.component';
import {CategoryDetailComponent} from './dashboard/categories/category-detail/category-detail.component';
import {CategoryEditComponent} from './dashboard/categories/category-edit/category-edit.component';
import {CategoryListComponent} from './dashboard/categories/category-list/category-list.component';
import {NavWrapperComponent} from './wrapper/nav-wrapper/nav-wrapper.component';
import {ErrorPageComponent} from './error/error-page/error-page.component';
import {DashboardLoanComponent} from './dashboard-loan/dashboard-loan.component';
import {DashboardUserComponent} from './dashboard-user/dashboard-user.component';
import {GamesComponent} from './dashboard/games/games.component';
import {GameListComponent} from './dashboard/games/game-list/game-list.component';
import {GameSummaryComponent} from './dashboard/games/game-list/game-summary/game-summary.component';
import {GameDetailComponent} from './dashboard/games/game-detail/game-detail.component';
import {CommonModule} from '@angular/common';
import {GameEditWrapperComponent} from './wrapper/game-edit-wrapper/game-edit-wrapper.component';
import {GameEditComponent} from './dashboard/games/game-edit/game-edit.component';
import {CategoryHandlerComponent} from './dashboard/games/game-edit/category-handler/category-handler.component';
import {NameHandlerComponent} from './dashboard/games/game-edit/name-handler/name-handler.component';
import {ThemeHandlerComponent} from './dashboard/games/game-edit/theme-handler/theme-handler.component';
import {CreatorHandlerComponent} from './dashboard/games/game-edit/creator-handler/creator-handler.component';
import {LineHandlerComponent} from './dashboard/games/game-edit/line-handler/line-handler.component';
import {PublisherHandlerComponent} from './dashboard/games/game-edit/publisher-handler/publisher-handler.component';
import {InfoHandlerComponent} from './dashboard/games/game-edit/info-handler/info-handler.component';
import {SizeHandlerComponent} from './dashboard/games/game-edit/size-handler/size-handler.component';
import {StuffHandlerComponent} from './dashboard/games/game-edit/stuff-handler/stuff-handler.component';
import {ImageHandlerComponent} from './dashboard/games/game-edit/image-handler/image-handler.component';
import {GameEditHelperComponent} from './dashboard/games/game-edit/game-edit-helper/game-edit-helper.component';
import {CategoryPickerComponent} from './dashboard/games/game-edit/category-handler/category-picker/category-picker.component';
import {ObjectToStringPipe} from './shared/pipes/object-to-string.pipe';
import {ThemePickerComponent} from './dashboard/games/game-edit/theme-handler/theme-picker/theme-picker.component';
import {CreatorPickerComponent} from './dashboard/games/game-edit/creator-handler/creator-picker/creator-picker.component';
import {LinePickerComponent} from './dashboard/games/game-edit/line-handler/line-picker/line-picker.component';
import {DescriptionHandlerComponent} from './dashboard/games/game-edit/description-handler/description-handler.component';
import {BannerComponent} from './shared/components/banner/banner.component';
import {LockedHeaderComponent} from './shared/components/locked-header/locked-header.component';
import {BackButtonComponent} from './shared/components/back-button/back-button.component';
import {NewGameBasicsComponent} from './dashboard/games/new-game/new-game-basics/new-game-basics.component';
import {NewGameComponent} from './dashboard/games/new-game/new-game.component';
import {NewGameParentChoiceComponent} from './dashboard/games/new-game/new-game-parent-choice/new-game-parent-choice.component';
import {NewGameAddCoreComponent} from './dashboard/games/new-game/new-game-add-core/new-game-add-core.component';
import {NewGameAddExtComponent} from './dashboard/games/new-game/new-game-add-ext/new-game-add-ext.component';
import {NewGameCoreSummaryComponent} from './dashboard/games/new-game/new-game-core-summary/new-game-core-summary.component';
import {NewGameInfosComponent} from './dashboard/games/new-game/new-game-infos/new-game-infos.component';
import {MemberListComponent} from './dashboard-user/members/member-list/member-list.component';
import {MemberNewComponent} from './dashboard-user/members/member-new/member-new.component';
import {MemberDetailComponent} from './dashboard-user/members/member-detail/member-detail.component';

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
    ObjectToStringPipe,
    ContactFormComponent,
    SimpleFilterFormComponent,
    ProductLinesComponent,
    ProductLineListComponent,
    ProductLineEditComponent,
    ProductLineDetailComponent,
    PublishersComponent,
    PublisherListComponent,
    PublisherDetailComponent,
    PublisherEditComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent,
    NavWrapperComponent,
    ErrorPageComponent,
    DashboardLoanComponent,
    DashboardUserComponent,
    GamesComponent,
    GameListComponent,
    GameSummaryComponent,
    GameDetailComponent,
    GameEditWrapperComponent,
    GameEditComponent,
    CategoryHandlerComponent,
    NameHandlerComponent,
    ThemeHandlerComponent,
    CreatorHandlerComponent,
    LineHandlerComponent,
    PublisherHandlerComponent,
    InfoHandlerComponent,
    SizeHandlerComponent,
    StuffHandlerComponent,
    ImageHandlerComponent,
    GameEditHelperComponent,
    CategoryPickerComponent,
    ThemePickerComponent,
    CreatorPickerComponent,
    LinePickerComponent,
    DescriptionHandlerComponent,
    BannerComponent,
    LockedHeaderComponent,
    BackButtonComponent,
    NewGameBasicsComponent,
    NewGameComponent,
    NewGameParentChoiceComponent,
    NewGameAddCoreComponent,
    NewGameAddExtComponent,
    NewGameCoreSummaryComponent,
    NewGameInfosComponent,
    MemberListComponent,
    MemberNewComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
