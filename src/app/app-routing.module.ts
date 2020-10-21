import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemesComponent} from './dashboard/themes/themes.component';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ThemeEditComponent} from './dashboard/themes/theme-edit/theme-edit.component';
import {ThemeDetailComponent} from './dashboard/themes/theme-detail/theme-detail.component';
import {ThemesResolverService} from './dashboard/themes/themes-resolver.service';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
