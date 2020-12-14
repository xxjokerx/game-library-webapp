import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemesComponent} from './dashboard/themes/themes.component';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ThemeEditComponent} from './dashboard/themes/theme-edit/theme-edit.component';
import {ThemeDetailComponent} from './dashboard/themes/theme-detail/theme-detail.component';
import {ThemeResolverService} from './dashboard/themes/theme-resolver.service';
import {ConfigurationComponent} from './dashboard/configuration/configuration.component';
import {CreatorsComponent} from './dashboard/creators/creators.component';
import {CreatorEditComponent} from './dashboard/creators/creator-edit/creator-edit.component';
import {CreatorDetailComponent} from './dashboard/creators/creator-detail/creator-detail.component';
import {CreatorResolverService} from './dashboard/creators/creator-resolver.service';
import {ProductLinesComponent} from './dashboard/product-line/product-lines.component';
import {ProductLineEditComponent} from './dashboard/product-line/product-line-edit/product-line-edit.component';
import {ProductLineDetailComponent} from './dashboard/product-line/product-line-detail/product-line-detail.component';
import {ProductLineResolverService} from './dashboard/product-line/product-line-resolver.service';
import {PublishersComponent} from './dashboard/publishers/publishers.component';
import {PublisherEditComponent} from './dashboard/publishers/publisher-edit/publisher-edit.component';
import {PublisherDetailComponent} from './dashboard/publishers/publisher-detail/publisher-detail.component';
import {ExistingThemesResolverService} from './dashboard/themes/existing-themes-resolver.service';
import {PublishersNamesResolver} from './dashboard/publishers/publishers-names-resolver.service';
import {PublishersResolverService} from './dashboard/publishers/publishers-resolver.service';

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
          {path: 'new', component: ThemeEditComponent, resolve: {existingThemes: ExistingThemesResolverService}},
          {
            path: ':id/edit',
            component: ThemeEditComponent,
            resolve: [ThemeResolverService, ExistingThemesResolverService]
          },
          {path: ':id', component: ThemeDetailComponent, resolve: [ThemeResolverService]}
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
        path: 'product-lines',
        component: ProductLinesComponent,
        children: [
          {path: 'new', component: ProductLineEditComponent},
          {path: ':id/edit', component: ProductLineEditComponent, resolve: [ProductLineResolverService]},
          {path: ':id', component: ProductLineDetailComponent, resolve: [ProductLineResolverService]}
        ]
      },
      {
        path: 'publishers',
        component: PublishersComponent,
        children: [
          {path: 'new', component: PublisherEditComponent, resolve: [PublishersNamesResolver]},
          {path: ':id/edit', component: PublisherEditComponent, resolve: [PublishersResolverService, PublishersNamesResolver]},
          {path: ':id', component: PublisherDetailComponent, resolve: [PublishersResolverService]}
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
