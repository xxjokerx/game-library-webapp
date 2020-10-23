import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemesComponent} from './dashboard/themes/themes.component';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ThemeEditComponent} from './dashboard/themes/theme-edit/theme-edit.component';
import {ThemeDetailComponent} from './dashboard/themes/theme-detail/theme-detail.component';
import {ThemesResolverService} from './dashboard/themes/themes-resolver.service';
import {ConfigurationComponent} from './dashboard/configuration/configuration.component';
import {CreatorsComponent} from './dashboard/creators/creators.component';
import {CreatorEditComponent} from './dashboard/creators/creator-edit/creator-edit.component';
import {CreatorDetailComponent} from './dashboard/creators/creator-detail/creator-detail.component';
import {CreatorResolverService} from './dashboard/creators/creator-resolver.service';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ADMIN']},
    children: [
      {
        path: 'themes',
        component: ThemesComponent,
        children: [
          {path: 'new', component: ThemeEditComponent},
          {path: ':id/edit', component: ThemeEditComponent, resolve: [ThemesResolverService]},
          {path: ':id', component: ThemeDetailComponent, resolve: [ThemesResolverService]}
        ]
      },
      {
        path: 'creators',
        component: CreatorsComponent,
        children: [
          {path: 'new', component: CreatorEditComponent},
          {path: ':id/edit', component: CreatorEditComponent, resolve: [CreatorResolverService]},
          {path: ':id', component: CreatorDetailComponent, resolve: [CreatorResolverService]}
        ]
      },
      {
        path: 'configuration',
        component: ConfigurationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
