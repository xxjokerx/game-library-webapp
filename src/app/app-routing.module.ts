import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemesComponent} from './dashboard/themes/themes.component';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ThemeEditComponent} from './dashboard/themes/theme-edit/theme-edit.component';
import {ThemeDetailComponent} from './dashboard/themes/theme-detail/theme-detail.component';
import {ThemeResolver} from './dashboard/themes/theme-resolver.service';
import {ConfigurationComponent} from './dashboard/configuration/configuration.component';
import {CreatorsComponent} from './dashboard/creators/creators.component';
import {CreatorEditComponent} from './dashboard/creators/creator-edit/creator-edit.component';
import {CreatorDetailComponent} from './dashboard/creators/creator-detail/creator-detail.component';
import {CreatorResolver} from './dashboard/creators/creator-resolver.service';
import {ProductLinesComponent} from './dashboard/product-line/product-lines.component';
import {ProductLineEditComponent} from './dashboard/product-line/product-line-edit/product-line-edit.component';
import {ProductLineDetailComponent} from './dashboard/product-line/product-line-detail/product-line-detail.component';
import {ProductLineResolver} from './dashboard/product-line/product-line-resolver.service';
import {PublishersComponent} from './dashboard/publishers/publishers.component';
import {PublisherEditComponent} from './dashboard/publishers/publisher-edit/publisher-edit.component';
import {PublisherDetailComponent} from './dashboard/publishers/publisher-detail/publisher-detail.component';
import {ExistingThemesResolver} from './dashboard/themes/existing-themes-resolver.service';
import {PublishersNamesResolver} from './dashboard/publishers/publishers-names-resolver.service';
import {PublishersResolver} from './dashboard/publishers/publishers-resolver.service';
import {ProductLineNamesResolver} from './dashboard/product-line/product-line-names-resolver.service';
import {CreatorNameResolver} from './dashboard/creators/creator-name-resolver.service';
import {CategoriesComponent} from './dashboard/categories/categories.component';
import {CategoryEditComponent} from './dashboard/categories/category-edit/category-edit.component';
import {CategoryDetailComponent} from './dashboard/categories/category-detail/category-detail.component';
import {CategoryResolver} from './dashboard/categories/category-resolver.service';
import {NavWrapperComponent} from './wrapper/nav-wrapper/nav-wrapper.component';
import {ErrorPageComponent} from './error/error-page/error-page.component';
import {DashboardLoanComponent} from './dashboard-loan/dashboard-loan.component';
import {DashboardUserComponent} from './dashboard-user/dashboard-user.component';
import {GamesComponent} from './dashboard/games/games.component';
import {GameOverviewResolver} from './dashboard/games/game-overview-resolver.service';
import {GameSummaryComponent} from './dashboard/games/game-list/game-summary/game-summary.component';
import {GameListComponent} from './dashboard/games/game-list/game-list.component';
import {GameDetailComponent} from './dashboard/games/game-detail/game-detail.component';
import {GameResolver} from './dashboard/games/game-resolver.service';
import {LockedModeWrapperComponent} from './wrapper/locked-mode-wrapper/locked-mode-wrapper.component';
import {GameEditComponent} from './dashboard/games/game-edit/game-edit.component';
import {CategoryHandlerComponent} from './dashboard/games/game-edit/category-handler/category-handler.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full',
  },
  {
    path: 'admin/locked-mode',
    component: LockedModeWrapperComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ADMIN']},
    children: [
      {
        path: 'games/:id/edit',
        component: GameEditComponent,
        resolve: [GameResolver],
        children: [
          {
            path: 'categories',
            component: CategoryHandlerComponent
          }
        ]
      }
    ]
  },
  {
    path: 'admin',
    component: NavWrapperComponent,
    children: [
      {
        path: 'editor',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']},
        children: [
          {
            path: 'games',
            component: GamesComponent,
            resolve: [GameOverviewResolver],
            children: [
              {
                path: 'list',
                component: GameListComponent,
                resolve: [GameOverviewResolver],
                children: [
                  {path: ':id', component: GameSummaryComponent}]
              },
              {
                path: 'detail/:id',
                component: GameDetailComponent,
                resolve: [GameResolver]
              }
            ]
          },
          {
            path: 'themes',
            component: ThemesComponent,
            children: [
              {path: 'new', component: ThemeEditComponent, resolve: [ExistingThemesResolver]},
              {path: ':id/edit', component: ThemeEditComponent, resolve: [ThemeResolver, ExistingThemesResolver]},
              {path: ':id', component: ThemeDetailComponent, resolve: [ThemeResolver]}
            ]
          },
          {
            path: 'creators',
            component: CreatorsComponent,
            children: [
              {path: 'new', component: CreatorEditComponent, resolve: [CreatorNameResolver]},
              {path: ':id/edit', component: CreatorEditComponent, resolve: [CreatorResolver, CreatorNameResolver]},
              {path: ':id', component: CreatorDetailComponent, resolve: [CreatorResolver]}
            ]
          },
          {
            path: 'product-lines',
            component: ProductLinesComponent,
            children: [
              {path: 'new', component: ProductLineEditComponent, resolve: [ProductLineNamesResolver]},
              {path: ':id/edit', component: ProductLineEditComponent, resolve: [ProductLineResolver, ProductLineNamesResolver]},
              {path: ':id', component: ProductLineDetailComponent, resolve: [ProductLineResolver]}
            ]
          },
          {
            path: 'publishers',
            component: PublishersComponent,
            children: [
              {path: 'new', component: PublisherEditComponent, resolve: [PublishersNamesResolver]},
              {path: ':id/edit', component: PublisherEditComponent, resolve: [PublishersResolver, PublishersNamesResolver]},
              {path: ':id', component: PublisherDetailComponent, resolve: [PublishersResolver]}
            ]
          },
          {
            path: 'categories',
            component: CategoriesComponent,
            resolve: [CategoryResolver],
            children: [
              {path: 'new', component: CategoryEditComponent},
              {path: ':id/edit', component: CategoryEditComponent, resolve: [CategoryResolver]},
              {path: ':id', component: CategoryDetailComponent, resolve: [CategoryResolver]}
            ]
          },
          {
            path: 'configuration',
            component: ConfigurationComponent
          }]
      },
      {
        path: 'loans',
        component: DashboardLoanComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']},
      },
      {
        path: 'users',
        component: DashboardUserComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']},
      }
    ]
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {message: 'page not found!'}
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    // , {enableTracing: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
